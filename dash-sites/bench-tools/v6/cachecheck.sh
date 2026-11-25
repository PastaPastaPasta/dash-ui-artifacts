#!/bin/bash
echo "== AAAA dash.site: $(dig +short AAAA dash.site | tr '\n' ' ')"
NEW=$(curl -s4 https://dash.site/new)
SW=$(curl -s4 https://dash.site/sw.js)
URLS="https://dash.site/ https://d4shhq.dash.site/ https://dash.site/sw.js https://d4shhq.dash.site/sw.js https://dash.site/shell.json https://dash.site/new https://dash.site/publish"
for p in $(echo "$NEW" | grep -o '/new/assets/[^"]*' | sort -u); do URLS="$URLS https://dash.site$p"; done
CSS=$(echo "$NEW" | grep -o '/new/assets/styles-[^"]*')
F=$(curl -s4 https://dash.site$CSS | grep -o 'bricolage-[0-9a-f]*\.woff2' | head -1); URLS="$URLS https://dash.site/new/assets/$F"
C=$(curl -s4 https://dash.site$(echo "$NEW" | grep -o '/new/assets/app-[^"]*') | grep -o 'c/[A-Za-z0-9_-]*\.js' | head -1); [ -n "$C" ] && URLS="$URLS https://dash.site/new/assets/$C"
for v in $(echo "$SW" | grep -o '/dash-sites-verifier-[0-9a-f]*\.[a-z.]*' | sort -u); do URLS="$URLS https://dash.site$v"; done
fail=0
for u in $URLS; do
  for fam in 4 6; do
    curl -s -$fam -o /dev/null -D - "$u" | tr -d '\r' | grep -iE '^(HTTP|cache-control|location):' | tr '\n' ' ' > /tmp/c$fam
  done
  if [ "$(cat /tmp/c4)" = "$(cat /tmp/c6)" ]; then r=SAME; else r=DIFF; fail=1; fi
  echo "$r ${u#https://} | v4: $(cat /tmp/c4)"
  [ $r = DIFF ] && echo "     v6: $(cat /tmp/c6)"
done
echo "RESULT fail=$fail"
