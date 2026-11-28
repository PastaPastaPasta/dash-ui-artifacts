# Stable feedback and copy controls

Before uses merge base `44fdc355190322f53a9825f756df2d01987afd63` (Add Contact fix from #1143).
After uses the application built at `b733b070a3e9fda9dc5660942b3eab1de3f9e48e`. The final PR head
`30cb5678f0307617f9bd510ac9df544077132bfb` has the identical Git tree
`66488aa1dd7630ed45415cf0df031a511a7f9a79`.

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
