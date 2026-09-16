# QA102 emoji selection input focus

Explicit stack base (PR469): `7f259cfef8df477a7763c9c9d4680defb55a76f1`.
After full signed head: `8ff92b65f562135cea6712bd359ec83c1fc66780`.

| Surface | Same ordinary sequence | Before expected defect | After expected fix |
|---|---|---|---|
| Post composer | Enter `emoji `, choose 😀, type `next` without clicking elsewhere | Input remains `emoji 😀`; focus is on picker trigger | Input reads `emoji 😀next`; focus returns to textarea |
| Direct-message composer | Same sequence in persona55's existing persona56 thread | Subsequent text is lost | Input resumes typing |

Independent committed devnet builds; before3311 and after3312. Fresh controlled persona55 session, existing recipient56 `6yDkcAPd29Y24aLt1Ec1ZaRfwd4BCMJB6Swg9tgeYFmx`; no message or post submission. Seeded sessions are not login evidence. Chromium1280×900/light theme;390px compatibility recorded separately. Real existing thread data and unaltered screenshots. Escape and trigger-toggle cancellation must restore picker-trigger focus, while actual selection focuses the intended editor. Exact final images will be inspected at original resolution and publication verified by public bytes/type/hash and rendered comparisons.
