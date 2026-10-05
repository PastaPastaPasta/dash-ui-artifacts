#!/usr/bin/env python3
"""Join per-run host timings, app os_log lines and SwiftDashSDK platform_wallet logs."""
import glob, json, os, re, subprocess, sys
from datetime import datetime, timezone

EV = "/Users/pasta/workspace/shielded-perf/evidence-1183"
UDID = open("/Users/pasta/workspace/shielded-perf/sim-udid-1183.txt").read().strip()
DATA = subprocess.run(["xcrun", "simctl", "get_app_container", UDID, "org.dashfoundation.dash", "data"],
                      capture_output=True, text=True).stdout.strip()
SDKLOGS = f"{DATA}/Library/Logs/SwiftDashSDK"


def sdk_lines():
    out = []
    for f in sorted(glob.glob(f"{SDKLOGS}/*/platform_wallet/run.log")):
        for line in open(f, errors="replace"):
            m = re.match(r"(\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+)Z\s+\w+\s+(.*)", line)
            if not m:
                continue
            ts = datetime.strptime(m.group(1)[:26], "%Y-%m-%dT%H:%M:%S.%f").replace(tzinfo=timezone.utc).timestamp()
            out.append((ts, m.group(2).strip(), f))
    return out


def oslog(run):
    res = []
    for line in open(f"{EV}/runs/{run}/app.log", errors="replace"):
        m = re.match(r"(\d{4}-\d\d-\d\d \d\d:\d\d:\d\d\.\d+)\s+\w+\s+(.*)", line)
        if m:
            ts = datetime.strptime(m.group(1), "%Y-%m-%d %H:%M:%S.%f").astimezone().timestamp()
            res.append((ts, m.group(2)))
    return res


SDK = sdk_lines()
rows = []
for run in sorted(os.listdir(f"{EV}/runs")):
    tj = f"{EV}/runs/{run}/timings.json"
    if not os.path.exists(tj):
        continue
    T = json.load(open(tj))
    osl = oslog(run)
    for s in T["sends"]:
        a, b = s["confirm_tap"], s["result_seen"] + 1
        sdk = [(t, msg) for t, msg, _ in SDK if a <= t <= b]
        def first(pat, src):
            for t, msg in src:
                if pat in msg:
                    return t, msg
            return None, None
        t_start, _ = first("Shielded withdrawal account=", sdk)
        t_built, _ = first("live activity entry recorded (pending)", sdk)
        t_done, _ = first("Shielded withdrawal broadcast succeeded", sdk)
        ow = [(t, m) for t, m in osl if a <= t <= b]
        r_start, _ = first("withdraw route amount=", ow)
        r_done, _ = first("withdraw route completed", ow)
        _, prover = first("SHIELDED-PROVER op=", ow)
        row = {
            "run": run, "build": T["build"], "send": s["index"],
            "confirm_tap_to_toast_poll_s": s["confirm_to_result_s_poll"],
            "route_s": round(r_done - r_start, 2) if r_start and r_done else None,
            "sdk_select_to_built_s": round(t_built - t_start, 2) if t_start and t_built else None,
            "sdk_broadcast_wait_s": round(t_done - t_built, 2) if t_built and t_done else None,
            "prover_line": prover.split(") ", 1)[-1] if prover else None,
            "loadavg1": round(T["loadavg_before"][0]),
            "cpu_idle_before": T.get("host_cpu_before", "").split(",")[-1].strip(),
        }
        rows.append(row)
json.dump(rows, open(f"{EV}/results.json", "w"), indent=2)
for r in rows:
    print(json.dumps(r))
