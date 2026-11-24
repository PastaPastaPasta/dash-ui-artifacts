#!/bin/bash
set -x
NAME=$1; BIN=$2; OUT=$3; HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$OUT"
DD=$(mktemp -d)
CLI="$BIN/dash-cli -regtest -datadir=$DD -rpcuser=u -rpcpassword=p"
ax() { osascript "$HERE/ax.applescript" "$@"; }
dumpax() { osascript -e 'tell application "System Events" to set p to first process whose name contains "dash"' -e 'tell application "System Events" to set r to ""' -e 'tell application "System Events" to repeat with e in (entire contents of window 1 of p)
try
set r to r & (role of e) & " | " & (name of e as text) & " | " & ((position of e) as text) & " | " & ((size of e) as text) & linefeed
end try
end repeat' -e 'return r' > "$1" 2>&1; }
rclick_center() { read x y w h <<<"$1"; cliclick "m:$((x+w/2)),$((y+h/2))" w:300 "rc:$((x+w/2)),$((y+h/2))"; }
rclick_row() { read x y w h <<<"$1"; cliclick "m:$((x+w/3)),$((y+40))" w:300 "rc:$((x+w/3)),$((y+40))"; }
first=1
MOCK=$(python3 -c "import datetime,sys;print(int(datetime.datetime.fromisoformat(sys.argv[1]).timestamp()))" "$PUSH_TS"); echo "mock=$MOCK"
for THEME in Light Dark; do
  defaults write org.dash.Dash-Qt-regtest theme -string $THEME
  defaults write org.dash.Dash-Qt-regtest fAppearanceSetupDone -bool true
  "$BIN/dash-qt" -regtest -datadir="$DD" -server -rpcuser=u -rpcpassword=p -listen=0 -dnsseed=0 -mocktime=$MOCK >> "$OUT/qt.log" 2>&1 &
  for i in $(seq 60); do $CLI getblockcount && break; sleep 2; done
  if [ $first = 1 ]; then
    $CLI -named createwallet wallet_name=w load_on_startup=true descriptors=true blank=true
    D=$($CLI getdescriptorinfo "pkh(cVpF924EspNh8KjYsfhgY96mmxvT6DgdWiTYMtMjuM74hJaU5psW)" | python3 -c 'import json,sys;print(json.load(sys.stdin)["checksum"])')
    $CLI -rpcwallet=w importdescriptors "[{\"desc\":\"pkh(cVpF924EspNh8KjYsfhgY96mmxvT6DgdWiTYMtMjuM74hJaU5psW)#$D\",\"timestamp\":\"now\"}]"
    A=$($CLI deriveaddresses "$($CLI getdescriptorinfo "pkh(cVpF924EspNh8KjYsfhgY96mmxvT6DgdWiTYMtMjuM74hJaU5psW)" | python3 -c 'import json,sys;print(json.load(sys.stdin)["descriptor"])')" | python3 -c 'import json,sys;print(json.load(sys.stdin)[0])')
    echo "addr=$A"
    $CLI -rpcwallet=w generatetoaddress 3 "$A" >/dev/null
    first=0
  fi
  sleep 6
  osascript -e 'tell application "System Events" to set frontmost of (first process whose name contains "dash") to true'
  osascript -e 'tell application "System Events" to tell (first process whose name contains "dash") to set position of window 1 to {44, 25}' -e 'tell application "System Events" to tell (first process whose name contains "dash") to set size of window 1 to {980, 691}'
  sleep 1
  screencapture -x "$OUT/$THEME-00-overview.png"
  # Transactions tab
  cliclick c:615,79; sleep 2
  screencapture -x "$OUT/$THEME-10-tx.png"
  cliclick m:300,247 w:300 rc:300,247; sleep 2
  screencapture -x "$OUT/$THEME-11-tx-menu.png"
  cliclick kp:esc; sleep 1; cliclick kp:esc; sleep 1
  # Send tab line edit
  cliclick c:289,79; sleep 1; cliclick c:289,79; sleep 2
  cliclick c:550,160 w:300 t:yWhatever w:300
  screencapture -x "$OUT/$THEME-20-send.png"
  cliclick m:550,160 w:300 rc:550,160; sleep 2
  screencapture -x "$OUT/$THEME-21-lineedit-menu.png"
  cliclick kp:esc; sleep 1
  $CLI stop; for i in $(seq 60); do pgrep -x dash-qt >/dev/null || break; sleep 1; done; sleep 2
done
