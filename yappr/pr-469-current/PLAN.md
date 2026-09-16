# PR 469 rebased comparison plan

Before: `cf0efbc10b8757137063113ebbd2061e8b87d8f7`.
After: `7f259cfef8df477a7763c9c9d4680defb55a76f1`.

| Surface | Before | After | Shared fixture | Visible delta |
|---|---|---|---|---|
| New Message, three forward Tabs from recipient input | Exact base | Full PR head | Fresh scoped persona55 session,1280×900,light theme; wait for both real participant names and followers to load | Background focus escape versus contained input focus |
| Escape after entering recipient query | Exact base | Full PR head | Same persona55 and viewport | Overlay remains versus closes with opener focus restored |
| Mobile New Message | Exact base | Full PR head | Persona55,390×844 | Compatibility only, recorded procedurally |

Independent committed production builds at3288/3290. Seeded private session setup is disclosed and is not login evidence. Actual network services and existing persona55/56 conversations; no message writes. Select persona56 by actual username/full identity. Verify semantics,12Tab/12ShiftTab confinement,all dismissal methods,input/search clearing,exact-opener focus restoration and mobile selection composer fallback procedurally. No mocked data or DOM styling. Screenshots are unaltered and must be inspected at original resolution before publication.
