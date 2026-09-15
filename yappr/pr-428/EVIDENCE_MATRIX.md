# Store default currency comparison

Base4105c5d1c914f5d0838619da93c3b8d28b4a780e (independent production devnet build, localhost:3211).
Head0bf37422f36f501c82a0a29775e1084a00a9a8ee (independent production devnet build, localhost:4189).
Same actual seller40, store98FYBhEF9Q8xNzbamzy66Dm5cMQ5gm9MoAZaiy518sNp, saved default DASH. Normal UI login. Separate contexts. Chromium1440×1200, en-US, America/Chicago, light. No app DOM or SDK data mocking.

| Surface | Before | After | Expected delta |
| --- | --- | --- | --- |
| New product | exact base | full head | default USD becomes saved DASH |
| New shipping zone | exact base | full head | default USD becomes saved DASH |
| CAD availability | exact base | full head | CAD becomes selectable to support all store defaults |

Compatibility: existing product and zone currency remain their own saved currency; manual new-form override remains possible; cancel/reopen shipping modal restores store default. Real UI readback validates these, no synthetic visual delta claimed.
