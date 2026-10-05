#!/usr/bin/env python3
"""One measured run: cold launch -> 15 s on home -> record -> N shielded->core sends.

usage: run.py <run-label> <base|warm> [sends=1]
Writes runs/<label>/{video.mp4, app.log, timings.json}.
"""
import json, os, signal, subprocess, sys, time, importlib.util

ROOT = "/Users/pasta/workspace/shielded-perf"
EV = f"{ROOT}/evidence-1183"
UDID = open(f"{ROOT}/sim-udid-1183.txt").read().strip()
APPS = {
    "base": f"{ROOT}/apps-1183/base-7c0064d6b/dashpay.app",
    "warm": f"{ROOT}/apps-1183/warm-28a7bc614/dashpay.app",
}
BUNDLE = "org.dashfoundation.dash"
PIN = os.environ["QA_PIN"]  # simulator wallet PIN, not published
AMOUNT = "0.01"

spec = importlib.util.spec_from_file_location("ui", f"{EV}/tools/ui.py")
ui = importlib.util.module_from_spec(spec)
sys.argv, _argv = ["ui.py"], sys.argv
spec.loader.exec_module(ui)
sys.argv = _argv

label, build = sys.argv[1], sys.argv[2]
sends = int(sys.argv[3]) if len(sys.argv) > 3 else 1
out = f"{EV}/runs/{label}"
os.makedirs(out, exist_ok=True)
T = {"label": label, "build": build, "app": APPS[build], "udid": UDID, "sends": []}


def now():
    return time.time()


def simctl(*a, check=True):
    return subprocess.run(["xcrun", "simctl", *a], capture_output=True, text=True, check=check)


def labels():
    return [(str(e.get("AXLabel") or ""), e) for e in ui.elements()]


def wait_any(texts, timeout):
    t0 = now()
    while now() - t0 < timeout:
        ls = labels()
        for t in texts:
            for lab, e in ls:
                if t in lab:
                    return t, e, now()
        time.sleep(0.3)
    return None, None, now()


def tap_el(e):
    x, y = ui.center(e)
    ui.idb("ui", "tap", str(round(x)), str(round(y)))


def tap_label(text, exact=True, n=0):
    m = ui.find(text, exact)
    if len(m) <= n:
        raise SystemExit(f"NOT FOUND {text}")
    tap_el(m[n])
    return now()


def tap_key(d):
    for _ in range(12):
        m = [e for e in ui.elements() if str(e.get("AXLabel") or "") == d]
        if m:
            break
        time.sleep(0.25)
    else:
        raise SystemExit(f"KEY NOT FOUND {d}")
    tap_el(max(m, key=lambda e: e["frame"]["y"]))


def one_send(idx):
    s = {"index": idx}
    ui.idb("ui", "tap", "201", "822")  # centre tab-bar button (Send/Receive sheet)
    _, e, _ = wait_any(["Internal"], 15)
    for attempt in range(4):
        time.sleep(1.0)
        tap_label("Internal")
        hit, _, _ = wait_any(["diagonal-up-down", "I got it"], 4)
        if hit:
            break
    else:
        raise SystemExit("Internal tab did not open")
    time.sleep(0.5)
    if ui.find("I got it", True):
        tap_label("I got it")
        time.sleep(1.0)
    # wait until the shielded balance shown in the transfer view is spendable (> 0)
    t_wait = now()
    while True:
        els = labels()
        rows = [ui.center(e)[1] for l, e in els if l == "Shielded"]
        vals = []
        for l, e in els:
            x, y = ui.center(e)
            if rows and abs(y - rows[0]) < 6 and x > 300:
                try:
                    vals.append(float(l.strip()))
                except ValueError:
                    pass
        if vals and vals[0] > 0.02:
            break
        if now() - t_wait > 180:
            raise SystemExit("shielded balance never became spendable")
        tap_label("navigationbar-close")
        time.sleep(5)
        ui.idb("ui", "tap", "201", "822")
        wait_any(["Internal"], 15)
        time.sleep(1.0)
        tap_label("Internal")
        wait_any(["diagonal-up-down"], 5)
        time.sleep(0.5)
    s["waited_for_spendable_s"] = round(now() - t_wait, 1)
    # direction must be Shielded (top, FROM) -> Dash Wallet
    els = labels()
    y_sh = min((ui.center(e)[1] for l, e in els if l == "Shielded"), default=None)
    y_dw = min((ui.center(e)[1] for l, e in els if l == "Dash Wallet"), default=None)
    if y_sh is None or y_dw is None:
        raise SystemExit("transfer view not found")
    if y_dw < y_sh:
        tap_label("diagonal-up-down")
        time.sleep(1.0)
    for d in AMOUNT:
        tap_key(d)
        time.sleep(0.25)
    time.sleep(0.8)
    tap_label("Continue")
    _, e, _ = wait_any(["Up to 10 minutes", "Network fee"], 15)
    time.sleep(1.5)
    confirm = [e for l, e in labels() if l == "Confirm" and e.get("type") == "Button"]
    s["confirm_tap"] = now()
    tap_el(confirm[-1])
    _, e, s["pin_screen_seen"] = wait_any(["Enter PIN"], 15)
    for d in PIN:
        tap_key(d)
        time.sleep(0.25)
    s["pin_done"] = now()
    hit, e, s["result_seen"] = wait_any(["Transfer complete", "failed", "Failed", "Error", "error"], 240)
    s["result"] = hit
    s["confirm_to_result_s_poll"] = round(s["result_seen"] - s["confirm_tap"], 2)
    s["pin_done_to_result_s_poll"] = round(s["result_seen"] - s["pin_done"], 2)
    print(json.dumps(s))
    return s


# --- install & cold launch
simctl("terminate", UDID, BUNDLE, check=False)
time.sleep(1.5)
simctl("install", UDID, APPS[build])
T["loadavg_before"] = os.getloadavg()
def cpu_line():
    r = subprocess.run(["top", "-l", "2", "-n", "0", "-s", "1"], capture_output=True, text=True)
    return [l for l in r.stdout.splitlines() if l.startswith("CPU usage")][-1]
T["host_cpu_before"] = cpu_line()
logf = open(f"{out}/app.log", "w")
logp = subprocess.Popen(
    ["xcrun", "simctl", "spawn", UDID, "log", "stream", "--style", "compact", "--level", "info",
     "--predicate",
     'process == "dashpay" AND (eventMessage CONTAINS "SHIELDED-PROVER" OR eventMessage CONTAINS "SHIELD-TX ::")'],
    stdout=logf, stderr=subprocess.STDOUT)
time.sleep(2)
T["launch"] = now()
r = simctl("launch", UDID, BUNDLE)
T["launch_out"] = r.stdout.strip()
hit, e, t = wait_any(["Enter PIN", "TESTNET"], 60)
if hit == "Enter PIN":
    time.sleep(0.8)
    for d in PIN:
        tap_key(d)
        time.sleep(0.25)
    hit, e, t = wait_any(["TESTNET"], 60)
if hit != "TESTNET":
    raise SystemExit("home screen not reached")
T["home_seen"] = t
time.sleep(15)

# --- record
vid = f"{out}/video.mp4"
recp = subprocess.Popen(["xcrun", "simctl", "io", UDID, "recordVideo", "--codec=h264", "--force", vid],
                        stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
T["record_spawned"] = now()
time.sleep(2.5)
try:
    for i in range(sends):
        T["sends"].append(one_send(i + 1))
        time.sleep(4)
        if i + 1 < sends:
            # dismiss whatever is on top, back to home
            time.sleep(4)
finally:
    time.sleep(1.5)
    recp.send_signal(signal.SIGINT)
    try:
        recp.wait(20)
    except Exception:
        recp.kill()
    T["record_stopped"] = now()
    time.sleep(1.5)
    logp.send_signal(signal.SIGINT)
    logp.wait(10)
    logf.close()
    T["loadavg_after"] = os.getloadavg()
    T["host_cpu_after"] = cpu_line()
    json.dump(T, open(f"{out}/timings.json", "w"), indent=2)
    print(open(f"{out}/app.log").read())
