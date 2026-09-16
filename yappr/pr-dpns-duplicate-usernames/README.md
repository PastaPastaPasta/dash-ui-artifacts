# Duplicate DPNS usernames

Entering the same name twice, or names that share a DPNS canonical label, offered both as available registrations. The fix marks every duplicate row, disables availability until resolved, and immediately clears the warning when a row is changed or removed.

Captured from separate exact-revision local devnet builds using the repository's unchanged Node static adapter and live devnet reads. Baseline `eb895be71a7207c73fb9329ac9d9bb7b398f53da`. Chromium, 1280 × 1000, matching unnamed identity and actual private-key login; no storage injection. No username registration or vote was sent. Screenshots are unmodified browser captures, reviewed at original resolution. An unrelated footer-logo omission is an adapter artifact, not a claimed product issue.

Head `be8d9de41d93e6fcd7dc853caca7ee212ff05c0b` (build ID `be8d9de4`). Build, lint and independent source review passed. Browser checks covered uppercase normalization, identical duplicates, i/l/1 aliases, edit to distinct live-available names, removal, and empty/non-ASCII/invalid text without render errors.

Before: duplicate names offered as two registrations.

![Before: duplicate available usernames](before/duplicate-review.png)

After: both duplicate rows explain the problem and Check Availability is disabled.

![After: duplicate names blocked](after/duplicate-entry.png)

DPNS-equivalent spellings are also blocked.

![After: alias duplicates blocked](after/alias-entry.png)

Editing to distinct names restores the normal review.

![After: distinct names available](after/distinct-review.png)

Structured run results are in `before/result.json` and `after/result.json`. Additional exact-state screenshots are retained alongside them.
