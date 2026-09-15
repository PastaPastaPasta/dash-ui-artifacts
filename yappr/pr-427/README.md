# Yappr PR #427 — blog management follows the app theme

[Product PR](https://github.com/PastaPastaPasta/yappr/pull/427)

- Before — exact staging base: `4105c5d1c914f5d0838619da93c3b8d28b4a780e`.
- After — full PR head: `c259236b416e9b2ac1b1fbb6f61b8ba48e46cba3`.
- Both revisions were independently built with `npm run build:devnet` and served from their own output directories. Staging was independently checked to remain at the stated base at capture.
- Chromium 1440×1100, device scale 1, en-US, America/Chicago. Fresh independent authenticated contexts for each revision and app theme. Authentication keys stayed in memory; no secret inputs were present at capture.

## Evidence matrix

| Surface | Shared state | Light-theme result | Dark-theme result |
| --- | --- | --- | --- |
| Dashboard | Same selected blog and published article | Invisible selected title/tab and pale article title become readable | Existing appearance retained |
| Create dialog | Same empty dialog | Black title, close, and cancel on near-black become readable on light panel | Existing appearance retained |
| Settings | Same saved metadata, labels and defaults | Black headings/switch text on near-black become readable | Existing appearance retained |
| Composer | Same existing article, Edit mode, post settings expanded | White title becomes readable; settings follow light palette; editor stops forcing dark palette | Original dark text color retained |
| Image URL controls | Same article, empty cover/body URL controls opened | Fields and controls use light surfaces and readable text | Existing appearance retained |
| Theme editor | Same saved Ocean theme, no edits | Presets, selected segments, fonts and controls become readable | Existing dark management palette retained |
| Public reader | Same existing article, Ocean theme | Compatibility: custom palette/font unchanged | Compatibility: same custom palette/font, independent of app dark mode |

## Shared fixture and procedure

Owner: seeded persona44, `soren-notes7.dash`, identity `4WJqx5yBKTW3v6FbkvwNZpGvWyafDzTjMSZLZEYwtC8R`.

Blog: `GZkg15HyWHb3L4QjcnE6xU2AqkPBtxSYhC76qVHSu1rz`, **QA lifecycle blog 20260915 p44**. Article slug: `qa-article-lifecycle-20260915-p44`, title **QA article lifecycle 20260915 p44**. The same saved article body begins **QA article body EDITED**. This is an existing synthetic devnet QA fixture.

The browser selected the existing blog, opened Settings, opened the existing article's Edit view, expanded post settings and the two image-URL controls, viewed the Theme tab, opened/cancelled Create Blog, and read the public article. **No create/save/publish/comment/delete action was submitted.** Nothing in the blog, article, theme, or comments was modified for these captures. Requests, app markup, and product state were not mocked. The custom preview is the application's own existing live preview. Relative times and unrelated live sidebar network counts can vary; no claim depends on them.

## Light-theme comparisons

### Dashboard

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before light dashboard](comparison/before/light/dashboard.png) | ![After light dashboard](comparison/after/light/dashboard.png) |

### Create

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before light create](comparison/before/light/create.png) | ![After light create](comparison/after/light/create.png) |

### Settings

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before light settings](comparison/before/light/settings.png) | ![After light settings](comparison/after/light/settings.png) |

### Compose

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before light compose](comparison/before/light/compose.png) | ![After light compose](comparison/after/light/compose.png) |

### Image Urls

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before light image-urls](comparison/before/light/image-urls.png) | ![After light image-urls](comparison/after/light/image-urls.png) |

### Theme

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before light theme](comparison/before/light/theme.png) | ![After light theme](comparison/after/light/theme.png) |

### Reader

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before light reader](comparison/before/light/reader.png) | ![After light reader](comparison/after/light/reader.png) |

## Dark-theme compatibility comparisons

### Dashboard

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before dark dashboard](comparison/before/dark/dashboard.png) | ![After dark dashboard](comparison/after/dark/dashboard.png) |

### Create

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before dark create](comparison/before/dark/create.png) | ![After dark create](comparison/after/dark/create.png) |

### Settings

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before dark settings](comparison/before/dark/settings.png) | ![After dark settings](comparison/after/dark/settings.png) |

### Compose

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before dark compose](comparison/before/dark/compose.png) | ![After dark compose](comparison/after/dark/compose.png) |

### Image Urls

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before dark image-urls](comparison/before/dark/image-urls.png) | ![After dark image-urls](comparison/after/dark/image-urls.png) |

### Theme

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before dark theme](comparison/before/dark/theme.png) | ![After dark theme](comparison/after/dark/theme.png) |

### Reader

| Before — exact staging base | After — full PR head |
| --- | --- |
| ![Before dark reader](comparison/before/dark/reader.png) | ![After dark reader](comparison/after/dark/reader.png) |

## Framing and validation

Focused images are native-resolution crops of actual full-page screenshots, without resizing, annotations, or DOM changes. Matching surface pairs use identical framing and dimensions. Dashboard crops retain the blog header, tabs and full article row; composer crops retain the article title, body, settings, and image controls. Settings and theme crops include their complete forms. Reader images demonstrate custom-theme compatibility rather than a visual change.

Full app context: [light dashboard before](comparison/before/light/dashboard-full.png) · [after](comparison/after/light/dashboard-full.png); [light create before](comparison/before/light/create-full.png) · [after](comparison/after/light/create-full.png); [dark dashboard before](comparison/before/dark/dashboard-full.png) · [after](comparison/after/dark/dashboard-full.png); [dark create before](comparison/before/dark/create-full.png) · [after](comparison/after/dark/create-full.png).

All 28 final focused images and eight published full-page context images were opened and visually inspected. No credentials or unrelated windows appear. Initial exploratory crops with sticky-header overlap were replaced locally and never published. The after images were captured only after the final signed commit.

Targeted ESLint, standalone TypeScript, and devnet production build passed. Independent review approved the final seven-file diff. No new abstraction or functional refactor was introduced: light classes and explicit dark variants remain local to the affected management surfaces. No implementation-mirroring tests were added for these style changes. Ordinary-UI assertions verified loaded title/body state and matching exact fixture. [Before computed styles](before-measurements.json), [after computed styles](after-measurements.json), and [compatibility verification](verification.json) confirm the custom reader/preview palette and font are unchanged, and the dark editor retains its previous text color.

## SHA-256

- `46cfb60058d7e803cad366c66f2a7713cc4924e1145077c530484e8c00d2faa6` — `after-measurements.json`
- `b67713bc75051b11adde90ff8622d2dbda06260524db1a8bf4a8d1ca3d1bd69c` — `before-measurements.json`
- `ce093214b22d77011d17aec8dfb009bf92bae996fc09307a06ce8df0d4627b37` — `comparison/after/dark/compose.png` (700×820)
- `3f05106446bcf2bef87fb4d16c22294892a853364e2963804e4c98afc6c91ca0` — `comparison/after/dark/create-full.png` (1440×1100)
- `df3d08fdbb1b04febaf47268f3fd964c6c21f94fd80a7fb37b62a821e8b1f9ad` — `comparison/after/dark/create.png` (672×705)
- `3d78300f4788731ce31702096a2d6abef50574ae99e22819f831b1e6de7063fc` — `comparison/after/dark/dashboard-full.png` (1440×1100)
- `4c931d53cf0471d21f5de27b80ec3d1f0a104af8584a968ac17f048b01f0d801` — `comparison/after/dark/dashboard.png` (700×430)
- `a1f3c9a395714ad491791b75f3c4e09e29d4ab829d0ab941de9e0cde18893e80` — `comparison/after/dark/image-urls.png` (700×830)
- `2cf5ff559587cc24136b1d12e22399cca06eed0cc68817ef1042da8aa4dcc2ca` — `comparison/after/dark/reader.png` (1440×1000)
- `467c2a40f769095c93b41eecd647dff510be657f4c7a9ab5436dc35a83f1651b` — `comparison/after/dark/settings.png` (700×1168)
- `8da3693dfe93902c59a531dccb854d7d3ca04b25cb689b9e2617981982d29f6c` — `comparison/after/dark/theme.png` (1100×1261)
- `d95ad67e437fa4bba170b19880ea226bde163fcc8296cf57673343934351d883` — `comparison/after/light/compose.png` (700×820)
- `b380e97989d7186d62bf834d02d23837bfc76fb4580ff0922005c10c059e3307` — `comparison/after/light/create-full.png` (1440×1100)
- `43d3a9933495d4f17c996a2680c34015883c4948b701cc7be4ceb219dcb13dda` — `comparison/after/light/create.png` (672×705)
- `4ce55c6c8a09e4ff3af768c8c5347effc190ad5510bb30c9835fb57249e1da0c` — `comparison/after/light/dashboard-full.png` (1440×1100)
- `41ea53e5958bf1ee430ef2554b1d2abe154be1a522b980e79e74593b0d6a4595` — `comparison/after/light/dashboard.png` (700×430)
- `3ba45e5760ababd8380cbb18a305c6d588247392e32e8aa00d7ae1d124b7af73` — `comparison/after/light/image-urls.png` (700×830)
- `2cf5ff559587cc24136b1d12e22399cca06eed0cc68817ef1042da8aa4dcc2ca` — `comparison/after/light/reader.png` (1440×1000)
- `a695a1f1ea9dec2e27831af3af1e47db0de88013aeb558978ca5a703eb123676` — `comparison/after/light/settings.png` (700×1168)
- `814d0ffcc5530b8cddea6e3a8f341e598f3dc3fbc50b0a62836c7c37b811f468` — `comparison/after/light/theme.png` (1100×1261)
- `ce093214b22d77011d17aec8dfb009bf92bae996fc09307a06ce8df0d4627b37` — `comparison/before/dark/compose.png` (700×820)
- `3f05106446bcf2bef87fb4d16c22294892a853364e2963804e4c98afc6c91ca0` — `comparison/before/dark/create-full.png` (1440×1100)
- `df3d08fdbb1b04febaf47268f3fd964c6c21f94fd80a7fb37b62a821e8b1f9ad` — `comparison/before/dark/create.png` (672×705)
- `3d78300f4788731ce31702096a2d6abef50574ae99e22819f831b1e6de7063fc` — `comparison/before/dark/dashboard-full.png` (1440×1100)
- `4c931d53cf0471d21f5de27b80ec3d1f0a104af8584a968ac17f048b01f0d801` — `comparison/before/dark/dashboard.png` (700×430)
- `39a9ad4a6421920d0eb33b8e348ec9fd4972507acf9cb321acdc017bb53afc56` — `comparison/before/dark/image-urls.png` (700×830)
- `81594b5cde774dfe3b4985358fe40fff3e8ec3d8899a3e156e7d87591b61ca7c` — `comparison/before/dark/reader.png` (1440×1000)
- `467c2a40f769095c93b41eecd647dff510be657f4c7a9ab5436dc35a83f1651b` — `comparison/before/dark/settings.png` (700×1168)
- `8da3693dfe93902c59a531dccb854d7d3ca04b25cb689b9e2617981982d29f6c` — `comparison/before/dark/theme.png` (1100×1261)
- `03bb98e63783734728229c2385023f57247bec849a7796751559e7dcb07e891b` — `comparison/before/light/compose.png` (700×820)
- `b4e6ccd4d84298f6eb324869ff39d8c54f1515dd6e43a5ecbe451a3eb3b1d8c8` — `comparison/before/light/create-full.png` (1440×1100)
- `3228699fe78ae881c7ea2536d7453eef1d56a25e28a4e724980d99673fd4ebaf` — `comparison/before/light/create.png` (672×705)
- `0e711a4d5bc599615debb96f5c7e600f6e7450a59b2d9c9b9d7793d80342afd4` — `comparison/before/light/dashboard-full.png` (1440×1100)
- `92d637874daa91fc80fe4b174baf3fe87a1e28931228849b782ec8be07e3d4c5` — `comparison/before/light/dashboard.png` (700×430)
- `d36a478f6bd6385064ead5a79bb9bf12fd5630300fc3204e1e81f0f3f2a6d414` — `comparison/before/light/image-urls.png` (700×830)
- `81594b5cde774dfe3b4985358fe40fff3e8ec3d8899a3e156e7d87591b61ca7c` — `comparison/before/light/reader.png` (1440×1000)
- `43dc72ddc2642cffcb853e040e4ddb05c6792719563893d98e487a5c947af814` — `comparison/before/light/settings.png` (700×1168)
- `57bc07a2ad0cfb625a05ceb238c5eaaa0bef3295a2645be18408cdd9b2984023` — `comparison/before/light/theme.png` (1100×1261)
- `d8cc585a82a35b890ba8ef704b3bb4e98d4d02701b5eed73fb9118a0e2408736` — `verification.json`
