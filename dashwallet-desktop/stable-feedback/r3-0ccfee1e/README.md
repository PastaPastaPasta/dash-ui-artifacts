# PR #1157 round 3: an alert under an open sheet

Before: `20db0d44e9ce6f099ed8a9fe1693f344bd23d8ae` (the previous PR head).
After: `0ccfee1e6f09420813b12a8479650d55b3cf08f0`.
Fixture backend (`funded`), Chromium, 920×620, in the pinned Playwright image.

The history export fails first (the fixture refuses `save_file_as`), so the alert is up. Then Pay ▸ To an address, 0.5 tDASH, Review.

- `*-confirm-sheet-with-alert`: Confirm payment open while the alert is up.
- `*-alert-after-sheet-closed`: after Cancel.
