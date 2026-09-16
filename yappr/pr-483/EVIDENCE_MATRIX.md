# QA83 evidence matrix

| Surface | Before | After | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Enable private feed: click Encryption Private Key label | 733faf53cd893cba861476a4af75b442ed67ca72 | 34325b025251717c8b821559e83982b193cbc41d | Persona38 4epjp48EuEG7UetQ7uExDsYNsoWLeVWU9Ym26sXb64WM, normal key2 WIF login, feed disabled, empty key | After input has focus ring; before does not focus |
| Reset private feed: click encryption-key label | 733faf53cd893cba861476a4af75b442ed67ca72 | 34325b025251717c8b821559e83982b193cbc41d | Persona39 9NFhqxW8upkFMVTE5h5VmYWLdSEJ26B2iMKdhCFgsWkd, normal key2 WIF login, enabled feed, empty key | After input has focus ring; before does not focus |
| Reset private feed: click RESET confirmation label | 733faf53cd893cba861476a4af75b442ed67ca72 | 34325b025251717c8b821559e83982b193cbc41d | Same39, empty confirmation | After confirmation input has focus ring; before does not focus |

Separate production devnet builds on localhost3278 and3291. Fresh Chromium contexts,1440×1200, device scale1, light theme, en-US, America/Chicago. No label/input DOM modifications or injected network state. Inputs remain empty, destructive Reset and Enable stay disabled, cancel each flow. Label association/accessibility and keyboard focus are asserted separately.
