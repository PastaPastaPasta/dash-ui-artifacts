#!/bin/bash
URL=https://d4shhq.dash.site/
mkdir -p ~/p && cd ~/p && npm init -y >/dev/null && npm i -s playwright-core@1.57 >/dev/null 2>&1
echo "$W" | base64 -d > w.mjs; echo "$T" | base64 -d > t.mjs
(node t.mjs 8050 6250000 30 >/dev/null 2>&1 &); sleep 1
echo == 50mbit; node w.mjs $URL /usr/bin/google-chrome http://127.0.0.1:8050 2
echo == unthrottled; node w.mjs $URL /usr/bin/google-chrome '' 1
for h in quorums.mainnet.networks.dash.org; do curl -s -D - -o /dev/null "https://$h/" | head -20; done
