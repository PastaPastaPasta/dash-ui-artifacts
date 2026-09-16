# QA80 evidence matrix

| Surface | Before revision/state | After revision/state | Shared fixture | Visible delta |
|---|---|---|---|---|
| Recovery destination, desktop1440×1100 |733faf53cd893cba861476a4af75b442ed67ca72: lost-key Reset Private Feed |462dd9be4f221954bbde9590f6ba0b2a4452cc82: same click |Normal WIF auth-key2 login as persona39; enabled private feed, zero followers |404 becomes actual Reset Private Feed confirmation |
| Recovery destination, mobile390×960 |Same exact frozen base, keyboard Enter on recovery button |Same exact full head |Same identity and feed; separate fresh browser context |404 becomes actual reset confirmation |
| Desktop trigger context |Lost Your Encryption Key dialog |Same dialog |Same identity, empty key inputs |Unchanged recovery button shown for context |

Each compiled hash checked in Settings About. Separate production devnet builds:3278 before,3292 after. Locale en-US, timezone America/Chicago, light theme, Chromium. Synthetic funded QA identity9NFhqxW8upkFMVTE5h5VmYWLdSEJ26B2iMKdhCFgsWkd. No data injection, response interception, clock edits, submitted reset, key rotation, or feed mutation. After screenshot, Cancel and reload verify no action parameter reopens dialog and feed remains enabled. The browser viewport excludes the address bar; actual navigation URLs are recorded in assertions.
