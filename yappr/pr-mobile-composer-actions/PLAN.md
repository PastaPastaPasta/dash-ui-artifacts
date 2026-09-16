# QA110 composer header controls on narrow screens

Before exact staging `cf0efbc10b8757137063113ebbd2061e8b87d8f7`; after full signed head `692eeed19f1989773d0634ae7dc520ae56fb8fa3`. Independent committed devnet builds. Persona55 fresh scoped session; draft `Mobile composer controls QA`; no posts submitted. Same light theme, widths320/390/1280.

| Surface | Before expected issue | After expected visible result |
|---|---|---|
| Ordinary mobile post composer at390px | Preview and Post extend outside clipped header | All header controls visible, Post/Preview on action row |
| Narrow320px composer | Same issue with stronger clipping | Controls fit, actionable without horizontal scroll |

Also check Preview/Edit, NSFW toggle, poll header and long private+teaser visibility at320px, reply/quote header, and1280px unchanged single-row layout. Wait for animation/profile state before capture. Preserve draft only locally, close afterward. Control bounding rectangles and center hit tests establish actual visibility; outer dialog bounds alone do not suffice.
