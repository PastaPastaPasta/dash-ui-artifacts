#!/usr/bin/env python3
"""Frame-accurate (per recorded frame) Confirm-tap -> 'Transfer complete' toast timing from each run's video.

Signals, in 402x874 point space:
  confirm  : confirm sheet = blue Confirm fill at (230, 791) + grey Cancel fill at (50, 791)
  toast    : 'Transfer complete' toast = dark pill at (125, 755) + green check at (139, 755)
Visual Confirm = first frame the idle confirm sheet (blue Confirm + grey Cancel) is gone after being shown
>= 0.5 s, i.e. the tap-highlight frame of the Confirm button.
Visual success = first frame the toast check is visible after that.
"""
import json, os, subprocess, sys
import numpy as np

EV = "/Users/pasta/workspace/shielded-perf/evidence-1183"
W, H, FPS = 402, 874, 30


def frames(path):
    """Yield (presentation time, RGB frame) for every recorded frame (no resampling:
    simctl writes variable-frame-rate video and resampling shifts the timeline)."""
    pts = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries",
                          "frame=pts_time", "-of", "csv=p=0", path], capture_output=True, text=True).stdout.split()
    p = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-i", path, "-fps_mode", "passthrough",
                          "-vf", f"scale={W}:{H}", "-f", "image2pipe", "-c:v", "rawvideo", "-pix_fmt", "rgb24", "-"],
                         stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    n = W * H * 3
    for t in pts:
        b = p.stdout.read(n)
        if len(b) < n:
            break
        yield float(t.strip(",")), np.frombuffer(b, np.uint8).reshape(H, W, 3)
    p.stdout.close()
    p.wait()


def region(f, x, y, r=2):
    return f[y - r:y + r + 1, x - r:x + r + 1].reshape(-1, 3).mean(0)


def is_confirm(f):
    # blue Confirm button on the right AND grey Cancel button on the left
    # (the transfer screen's full-width blue Continue button is blue at both points)
    # sampled clear of the button labels: Confirm fill (230,791), Cancel fill (50,791)
    r, g, b = region(f, 230, 791)
    cr, cg, cb = region(f, 50, 791)
    # strict idle colour of the Confirm fill: the tap highlight (59,165,231) already counts as "tapped"
    return (b > 220 and r < 20 and 130 < g < 150) and (222 < cr < 248 and abs(cr - cb) < 8)


def is_toast(f):
    # dark toast pill at (125,755) next to the green check at (139,755)
    pill = region(f, 125, 755, 1)
    r, g, b = region(f, 139, 755)
    return pill.max() < 60 and g - r > 40 and g > 150


def analyse(run):
    # Variable frame rate: a static screen emits no frames, so the sheet's on-screen
    # duration is measured at the transition frame (first frame it is no longer idle).
    out, state, shown_since, t_confirm = [], "idle", None, None
    for t, f in frames(f"{EV}/runs/{run}/video.mp4"):
        if state == "idle":
            if is_confirm(f):
                shown_since = shown_since if shown_since is not None else t
            elif shown_since is not None:
                if t - shown_since >= 0.5:
                    t_confirm, state = t, "waiting"
                shown_since = None
        elif state == "waiting":
            if is_toast(f):
                out.append({"video_confirm_s": round(t_confirm, 3), "video_toast_s": round(t, 3),
                            "video_confirm_to_toast_s": round(t - t_confirm, 2)})
                state, shown_since = "idle", None
    return out


if __name__ == "__main__":
    res = {}
    for run in sorted(os.listdir(f"{EV}/runs")):
        if os.path.exists(f"{EV}/runs/{run}/video.mp4"):
            res[run] = analyse(run)
            print(run, json.dumps(res[run]))
    json.dump(res, open(f"{EV}/video_times.json", "w"), indent=2)
