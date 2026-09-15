# Evidence matrix

| Behavior | Before | After | Shared fixture | Expected delta |
|---|---|---|---|---|
| Top first Load More, scroll at last initially ranked card | 4105c5d1c914f5d0838619da93c3b8d28b4a780e, independent server3211 | final signed head to be recorded before capture, independent server4192 | guest, live devnet seeded public ranking; same first20 post IDs;1440x1000, light theme, locale en-US, UTC | baseline resets to first post; fix retains last first-page cards and appends next20 |

No network, SDK, storage or DOM data substitution. Captures are ordinary browser UI against real devnet. Live ranking may change independently; exact IDs and scroll metrics accompany each capture.
