# Stable feedback and copy controls

Before revision `fca6fa6b12f5e38b7c84b8d9e422972a213467cd`. After revision
`a4bf51b411c2f739409b3499def04db777caf2c5`.

Each paired PNG places the exact-base capture on the left and the PR-head capture on
the right. Captures use Chromium 1.64.0 at 1280 × 820 and fixture-only data. The
copy icon states show the transaction detail To row in light and dark themes.

The Add Contact card now sits below the tabs and search controls. Its address row,
verification row and action use the existing spacing tokens. The action slot keeps
its size when Send changes to Show Request. Outcomes use the shared toast.

The shared copy glyph uses the secondary foreground token, with hover and focus
states. The visual guard calculates masked-glyph contrast and requires at least 3:1
in both themes.

The follow-up also reserves stable regions for QR loading, activity export and
filter feedback, contact-pane and notification outcomes, and Address Book export.
