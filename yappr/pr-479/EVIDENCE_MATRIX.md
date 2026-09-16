# QA75 mobile header fit comparison

| Surface | Before source | After source | Shared fixture | Expected visible delta |
|---|---|---|---|---|
|390px unread All | c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0 | 9872dfe7ea1536266e2ddfd9c187594069c95bda | Fresh recipient39 login; actual actor38 Like/Repost on H6upQuVsZVXHYMsXqRyp87T3aEu1bNCSb67mKmpbyLHX | Header controls fully fit viewport in the mobile grid |
|320px unread Mentions | Same base | Same head | Same fixture; Mentions has no matching notification | Long filter and read-all/settings controls fit |
|390px read and320px read Mentions | Same base | Same head | Normal Mark all as read | Fits both widths without unread action |

Separate production exports at3260/3285. Fresh normal login per revision; real notification state only, no mocks. Chromium mobile390×844 and320×844 plus desktop1440×1100; light, en-US, America/Chicago. Exact fixture and safe geometry captured in assertions. Keyboard menu open/Escape, selection, settings access and mark-all persistence checked separately.

Final layout: mobile title/settings first row, read-all/filter second row. Desktop settings precedes read-all, matching DOM/tab order. The discarded first wrapping attempt left an orphan cog at320px and is not part of the published evidence.
