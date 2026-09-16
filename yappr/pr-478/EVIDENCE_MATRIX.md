# QA74 preview read-state comparison

| Surface | Before source | After source | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Return from actual Like preview, Likes filter | c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0 | d64931848660871b7696cae2fa824c24bf45fdc1 | Recipient39 and actor38; seeded post H6upQuVsZVXHYMsXqRyp87T3aEu1bNCSb67mKmpbyLHX | Unread row badge/tab dot clears only on head |
| Return from actual article preview, Blog filter | Same base | Same head | Existing public QA44 blog, exact final article IDs recorded in assertions | Unread row badge/tab dot clears only on head |

Separate production exports at3260/3284; fresh normal login per scenario; no injected notifications or network responses. Chromium1440×1100, light, en-US, America/Chicago. Real event ages continue normally and may differ between runs. Keyboard Repost preview, already-read clicks, exact destinations, row-click control and reload persistence are checked separately.
