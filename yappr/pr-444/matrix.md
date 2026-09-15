# Evidence matrix

| Behavior | Before | After | Shared fixture | Visible delta |
|---|---|---|---|---|
| Render existing mention | 4105c5d1c914f5d0838619da93c3b8d28b4a780e / server3211 | final signed head to record / independent server4193 | Post4faUhcYZGdYhYf1BLKwg7RPgGdDQjcBDdpLAtBs5nmtg, persona53 to persona54 ingrid-vinyl9 | Entire mention resolves to correct profile instead of partial @ingrid |
| Typed hyphenated prefix | same base | same final head | assigned recipient, same @ingrid-vinyl | suggestions remain visible for valid hyphen |
| Actual mention publication and recipient notification | baseline QA post above, recipient fresh empty | new explicitly QA-only post after fix | same author53 and recipient54, same text suffix | new mention delivers real notification; old post is not retroactively indexed |

Nonhyphen control: persona54 published to @hamzak78; notification delivered after fresh readback. Baseline and after writes use different post IDs because data is real, not mocked. No private keys captured.
