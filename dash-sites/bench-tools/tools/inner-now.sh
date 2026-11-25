#!/bin/bash
URL=https://d4shhq.dash.site/
mkdir -p ~/p && cd ~/p && npm init -y >/dev/null && npm i -s playwright-core@1.57 >/dev/null 2>&1
echo "$C" | base64 -d > c.mjs; echo "$T" | base64 -d > t.mjs
(node t.mjs 8050 6250000 30 >/dev/null 2>&1 &); (node t.mjs 8020 2500000 30 >/dev/null 2>&1 &); sleep 1
curl -s6 -o /dev/null -w "ipv6 sw.js %{http_code} %{remote_ip}\n" https://dash.site/sw.js
curl -s6 -o /dev/null -w "ipv6 name %{http_code} %{remote_ip}\n" $URL
for f in $(curl -s https://dash.site/sw.js | grep -o 'https://dash.site/dash-sites-verifier-[0-9a-f]*\.[a-z.]*' | sort -u); do curl -s6 -o /dev/null -w "ipv6 $f %{size_download} B in %{time_total}s\n" -H 'Accept-Encoding: br' $f; done
echo == unthrottled; node c.mjs $URL 5 /usr/bin/google-chrome
echo == 50mbit 30ms; node c.mjs $URL 5 /usr/bin/google-chrome http://127.0.0.1:8050
echo == true
google-chrome --version
