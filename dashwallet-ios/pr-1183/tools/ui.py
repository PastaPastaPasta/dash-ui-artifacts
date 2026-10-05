#!/usr/bin/env python3
"""Tiny idb-based UI driver for the ShieldedPerf simulator.

ui.py dump                       -> compact list of visible elements
ui.py tap <text> [--exact] [--n K] -> tap the K-th element whose label/id/value contains text
ui.py tapxy <x> <y>              -> tap point (points)
ui.py type <text>                -> type text
ui.py wait <text> [timeout_s]    -> wait until an element with text appears; prints elapsed
ui.py swipe x1 y1 x2 y2
"""
import json, subprocess, sys, time

UDID = open("/Users/pasta/workspace/shielded-perf/sim-udid-1183.txt").read().strip()


def idb(*args, capture=True):
    r = subprocess.run(["idb", *args, "--udid", UDID], capture_output=capture, text=True, timeout=90)
    if r.returncode != 0:
        sys.stderr.write(r.stderr)
    return r.stdout


def elements():
    out = idb("ui", "describe-all")
    try:
        return json.loads(out)
    except Exception:
        return []


def text_of(e):
    return " | ".join(str(x) for x in (e.get("AXLabel"), e.get("AXUniqueId"), e.get("AXValue")) if x not in (None, ""))


def center(e):
    f = e["frame"]
    return f["x"] + f["width"] / 2, f["y"] + f["height"] / 2


def find(text, exact=False):
    res = []
    for e in elements():
        vals = [str(e.get(k) or "") for k in ("AXLabel", "AXUniqueId", "AXValue")]
        if exact:
            ok = text in vals
        else:
            ok = any(text.lower() in v.lower() for v in vals)
        if ok:
            res.append(e)
    return res


def main():
    cmd = sys.argv[1]
    if cmd == "dump":
        for e in elements():
            x, y = center(e)
            print(f"{e.get('type','?'):14} ({x:5.0f},{y:5.0f}) {'' if e.get('enabled', True) else '[disabled] '}{text_of(e)}")
    elif cmd == "tap":
        text = sys.argv[2]
        exact = "--exact" in sys.argv
        n = int(sys.argv[sys.argv.index("--n") + 1]) if "--n" in sys.argv else 0
        m = find(text, exact)
        if len(m) <= n:
            print(f"NOT FOUND: {text}")
            sys.exit(1)
        x, y = center(m[n])
        idb("ui", "tap", str(round(x)), str(round(y)))
        print(f"tapped {text_of(m[n])} at ({x:.0f},{y:.0f}) t={time.time():.3f}")
    elif cmd == "tapxy":
        idb("ui", "tap", str(round(float(sys.argv[2]))), str(round(float(sys.argv[3]))))
        print(f"tapped ({sys.argv[2]},{sys.argv[3]}) t={time.time():.3f}")
    elif cmd == "pin":
        # tap each digit on the on-screen keypad by its exact label
        pad = {}
        for e in elements():
            lab = str(e.get("AXLabel") or "")
            if len(lab) == 1 and (lab.isdigit() or lab == "."):
                pad[lab] = center(e)
        for d in sys.argv[2]:
            x, y = pad[d]
            idb("ui", "tap", str(round(x)), str(round(y)))
            time.sleep(0.25)
        print(f"pin entered t={time.time():.3f}")
    elif cmd == "type":
        idb("ui", "text", sys.argv[2])
    elif cmd == "swipe":
        idb("ui", "swipe", *[str(round(float(v))) for v in sys.argv[2:6]])
    elif cmd == "wait":
        text = sys.argv[2]
        timeout = float(sys.argv[3]) if len(sys.argv) > 3 else 120
        t0 = time.time()
        while time.time() - t0 < timeout:
            if find(text):
                print(f"found {text} after {time.time()-t0:.1f}s t={time.time():.3f}")
                return
            time.sleep(0.5)
        print(f"TIMEOUT waiting for {text}")
        sys.exit(2)


if __name__ == "__main__":
    main()
