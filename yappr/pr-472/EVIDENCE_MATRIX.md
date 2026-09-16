# PR 472 / QA68 and duplicate QA90 — replacement evidence matrix

| Surface | Before — exact base | After — full head | Shared fixture | Expected visible result |
|---|---|---|---|---|
| Blog Settings avatar, desktop and mobile | c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0 | 1f3074b1ea3167f9ca55e57f47afd84205998756 | Persona 64 blog BdMQRKM6xT8jx4bKbkhP3wYo7V835pDjcEWTbN5PMNRU; avatar https://yap.pr/yappr.png | Clipped Remove becomes fully visible and receives a pointer click |
| Keyboard Enter on Remove | Same exact base | Same complete head | Fresh normal private-key login, no storage provider; same saved blog | Before leaves blog for Settings; after clears only unsaved avatar and stays on blog |
| Keyboard Space and mobile pointer | Same exact base/head | Same | Same blog restored by full reload, no Save settings | Head clears unsaved avatar without navigation |

Independent production builds on shared base 3260 and head 3300, compiled hashes verified in Settings About before capture. Light theme, locale en-US, America/Chicago, desktop 1280×1100 and mobile 390×960. Fresh context per revision and viewport. No injected auth/application state, intercepted network responses, changed clocks, saved metadata/avatar writes, provider connection or file upload. Reload and reopen settings verify original avatar and metadata remain intact.

This comparison replaces the original PR 472 image set: its local output carried the c98a6ecd build stamp and was not verified as the committed 1f3074b1 head. The head has now been rebuilt from its clean signed commit. Source approval is unchanged. Blog Settings persistence of empty fields is the separate QA89 issue and is outside this draft-removal comparison.
