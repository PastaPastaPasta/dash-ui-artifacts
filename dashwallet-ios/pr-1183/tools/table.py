#!/usr/bin/env python3
"""Merge results.json (logs) + video_times.json into pub/results.json and a markdown table."""
import json, re, statistics as st, glob
R=json.load(open('results.json')); V=json.load(open('video_times.json'))
warm={}
for f in glob.glob('runs/W*/app.log'):
    m=re.search(r'warm-up ready duration_ms=(\d+)', open(f).read()); warm[f.split('/')[1]]=int(m.group(1))
order=['B1-base','W1-warm','B2-base','W2-warm','B3-base','W3-warm','B4-base','W4-warm','B5-base','W5-warm']
rows=[]
for r in R:
    cm=re.search(r'(?<![_a-z])call_ms=(\d+)', r['prover_line'] or '')
    rows.append(dict(r, video=V[r['run']][r['send']-1]['video_confirm_to_toast_s'], call_ms=int(cm.group(1)) if cm else None, warmup=warm.get(r['run'])))
rows.sort(key=lambda r:(order.index(r['run']), r['send']))
json.dump(rows, open('pub/results.json','w'), indent=2)
print('| Run | Build | Send | Confirm → "Transfer complete" (video) | SDK call (`SHIELD-TX` route) | `call_ms` (PR log) | Proof stage | Broadcast + execution wait | PR warm-up at launch | Host CPU idle |')
print('|---|---|---|---:|---:|---:|---:|---:|---:|---:|')
for r in rows:
    b='develop' if r['build']=='base' else 'PR'
    print(f"| {r['run'][:2]} | {b} | {'1st' if r['send']==1 else '2nd'} | {r['video']:.2f} s | {r['route_s']:.2f} s | {str(r['call_ms'])+' ms' if r['call_ms'] is not None else '—'} | **{r['sdk_select_to_built_s']:.2f} s** | {r['sdk_broadcast_wait_s']:.2f} s | {str(r['warmup'])+' ms' if r['warmup'] and r['send']==1 else '—'} | {r['cpu_idle_before'].replace(' idle','')} |")
print()
def s(b,n,k):
    xs=[r[k] for r in rows if r['build']==b and r['send']==n]; return f"{st.median(xs):.2f} s ({min(xs):.2f}–{max(xs):.2f}, n={len(xs)})"
print('| Median (min–max) | develop 1st | PR 1st | develop 2nd | PR 2nd |'); print('|---|---|---|---|---|')
for k,lab in [('video','Confirm → "Transfer complete" (video)'),('route_s','SDK call'),('sdk_select_to_built_s','**Proof stage**'),('sdk_broadcast_wait_s','Broadcast + execution wait')]:
    print(f"| {lab} | {s('base',1,k)} | {s('warm',1,k)} | {s('base',2,k)} | {s('warm',2,k)} |")
print()
for b,lab in [('base','develop'),('warm','PR')]:
    d=[]
    for run in order:
        rr=[r for r in rows if r['run']==run]
        if rr and rr[0]['build']==b and len(rr)==2: d.append(round(rr[0]['sdk_select_to_built_s']-rr[1]['sdk_select_to_built_s'],2))
    print(f"- Proof stage, 1st minus 2nd send of the same session, {lab}: " + ", ".join(f"{x:+.2f}" for x in d) + f" s (median {st.median(d):+.2f} s)")
