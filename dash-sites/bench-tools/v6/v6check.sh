#!/bin/bash
echo "== DNS"
for h in dash.site d4shhq.dash.site; do
  echo "$h A:    $(dig +short A $h | tr '\n' ' ')"
  echo "$h AAAA: $(dig +short AAAA $h | tr '\n' ' ')"
done
echo "== sandbox v6 route: $(ip -6 route get 2606:4700:4700::1111 2>&1 | head -1)"
SW=$(curl -s4 https://dash.site/sw.js)
V=$(echo "$SW" | grep -o '/dash-sites-verifier-[0-9a-f]*\.[a-z.]*' | sort -u)
URLS="https://dash.site/ https://d4shhq.dash.site/ https://dash.site/new https://dash.site/sw.js https://d4shhq.dash.site/sw.js"
for v in $V; do URLS="$URLS https://dash.site$v"; done
norm() { grep -viE '^(date|cf-ray|report-to|nel|age|alt-svc|server-timing|cf-cache-status|content-length|content-encoding|etag):' | tr -d '\r' | sort; }
fail=0
for u in $URLS; do
  for fam in 4 6; do
    curl -s -$fam -D /tmp/h$fam -o /tmp/b$fam -w "%{http_code} %{remote_ip} %{size_download}" --compressed "$u" > /tmp/w$fam
  done
  b4=$(sha256sum < /tmp/b4 | cut -c1-16); b6=$(sha256sum < /tmp/b6 | cut -c1-16)
  if [ "$b4" = "$b6" ] && diff <(norm < /tmp/h4) <(norm < /tmp/h6) >/dev/null && [ "$(cut -d' ' -f1 /tmp/w4)" = "$(cut -d' ' -f1 /tmp/w6)" ]; then r=SAME; else r=DIFF; fail=1; fi
  echo "$r $u"
  echo "   v4: $(cat /tmp/w4) body $b4"
  echo "   v6: $(cat /tmp/w6) body $b6"
  [ $r = DIFF ] && diff <(norm < /tmp/h4) <(norm < /tmp/h6)
done
echo "== v6 headers for https://d4shhq.dash.site/"
curl -s6 -D - -o /dev/null https://d4shhq.dash.site/ | tr -d '\r' | grep -viE '^(report-to|nel|cf-ray):'
echo "== v6 headers for verifier"
curl -s6 -D - -o /dev/null -H 'Accept-Encoding: br' https://dash.site$(echo "$V" | grep wasm) | tr -d '\r' | grep -viE '^(report-to|nel|cf-ray):'
echo "== build in sw.js (v6): $(curl -s6 https://dash.site/sw.js | grep -o 'dash-sites-verifier-[0-9a-f]*\.[a-z.]*' | sort -u | tr '\n' ' ')"
echo "RESULT fail=$fail"
