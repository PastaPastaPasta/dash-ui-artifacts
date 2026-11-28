# An alert raised while a sheet is open

Before: `0ccfee1e6f09420813b12a8479650d55b3cf08f0` (as merged in PR #1157).
After: `eb8392325e549d5a101d3517eb5d1d5cd69e6027`.
Fixture backend (`funded`), Chromium, 920×620, in the pinned Playwright image.

The history export is held and set to fail, About opens, and then the export answers. Its refusal is raised while About is open.
