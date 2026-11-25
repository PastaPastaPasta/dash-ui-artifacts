#!/usr/bin/env bash
fam=$1
for u in https://dash.site/ https://d4shhq.dash.site/; do
  echo "\$ curl $fam -sSI $u"
  curl $fam -sSI --max-time 15 "$u" | grep -i -E '^(HTTP|server|content-type|cache-control|strict-transport)' | tr -d '\r'
  curl $fam -sS -o /dev/null --max-time 15 -w "remote_ip=%{remote_ip}\n" "$u"
  h=${u#https://}; h=${h%/}
  echo | timeout 10 openssl s_client -connect "$h:443" -servername "$h" $( [ "$fam" = -6 ] && echo -6 || echo -4 ) 2>/dev/null | openssl x509 -noout -issuer -ext subjectAltName 2>/dev/null | tr -s ' ' | tr '\n' ' '; echo
done
