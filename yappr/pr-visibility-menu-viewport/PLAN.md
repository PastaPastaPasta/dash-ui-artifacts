# QA124 visibility menu viewport containment

Before exact staging cf0efbc10b8757137063113ebbd2061e8b87d8f7; after signed 45829cea52d95b338f1bf6112b97b369648d0c4c. Independent committed devnet builds on3288/3315. Persona55 seeded session; existing post9mcdDNznWP86bScjmMykF1kzNpecneoFoZVVNAB5qCFd as stable background; no write submissions.

| Surface | Before | After |
|---|---|---|
| Public visibility dropdown at320×844 | Inline menu extends beyond composer and clips private labels | Portaled popover stays within viewport and all labels visible |
|390px/1280px menu | Existing placement | Collision handling keeps content visible |

Same UI sequence, theme, viewport and profile. Also verify Public selection, outside click, trigger toggle, Escape (popover should close while composer remains), focus return, full enabled-private selection with persona39 existing feed, and no-follower warning. Existing header/toolbar clipping are separate QA110/QA120 and must not be misrepresented as fixed by this PR. Never publish ephemeral secrets; no credentials in screenshots. Original images and public files/rendered publication will be inspected.
