#!/bin/bash
mkdir -p ~/p && cd ~/p && npm init -y >/dev/null && npm i -s playwright-core@1.57 >/dev/null 2>&1
echo "$W" | base64 -d > w.mjs; echo "$T" | base64 -d > t.mjs
(node t.mjs 8050 6250000 30 >/dev/null 2>&1 &); sleep 1
for u in https://dash.site/new https://dash.site/ https://d4shhq.dash.site/; do
  echo "== $u unthrottled"; node w.mjs $u 3 /usr/bin/google-chrome | sed 's/,"list".*//'
  echo "== $u 50mbit"; node w.mjs $u 3 /usr/bin/google-chrome http://127.0.0.1:8050 | sed 's/,"list".*//'
done
echo "== /new warm list"; node w.mjs https://dash.site/new 1 /usr/bin/google-chrome | grep warm1 | grep -o '"list".*'
