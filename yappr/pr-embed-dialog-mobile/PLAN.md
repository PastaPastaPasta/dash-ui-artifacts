# QA95 evidence plan

Before exact base: cf0efbc10b8757137063113ebbd2061e8b87d8f7, frozen production output on 3288.
After signed source: 3af0497d0966e5ab8419009dbb7a0bf1bc17b378, independent clean successful `npm run build:devnet`, output on 3355.
Both Chromium guest contexts, same actual public article `5cY37VaxiKxBnprHfXG11Nx37eDv6Jb8RHYDMCmWWi8G`, blog `BkqjYQ95Mm2vNGEaoKbE473jodp7ZPFQr1Mj3jmqw6wA`, slug `qa-embed-navigation-20260915`, light embed preview, default author reading mode, no product writes or response injection.

| Surface | Same state | Before claim | After claim |
|---|---|---|---|
| 320x568 initial embed dialog | More actions → Embed | Header/Close clipped above viewport | Header/Close reachable within 16px margin |
| 320x568 after wheel scroll | Pointer on dialog right edge; wheel down 800px | Fixed container cannot reveal copy | Scroll reveals copy; actual click copies shown snippets |
| 390x667 initial dialog | More actions → Embed | Close partly clipped, copy below viewport | Dialog fits and scrolls |

Compatibility checks without invented visual change: desktop1280x900 size/content; Light/Dark preview, exact clipboard, Close/Escape/backdrop focus return; keyboard Tab remains in dialog; preview text can be scrolled; 390px copy reachable by actual scroll.
