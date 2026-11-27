# Add Contact layout

Before revision `fca6fa6b12f5e38b7c84b8d9e422972a213467cd`. After revision
`44fdc355190322f53a9825f756df2d01987afd63`.

Each PNG uses Chromium in the pinned Playwright 1.64.0 image at 1280 × 820, scale 1.
The application used fresh fixture data for each run. `dashpay-registered` supplies
Mallory and the unverified candidate mateo. `dashpay-no-keys` supplies the Enable
DashPay state. Checking is held at the fixture command. The failure is an injected
RPC response. The video clips show the Mallory send flow.

| State | Before | After |
| --- | --- | --- |
| Eligibility waiting | Looking up the candidate | Action skeleton at the eventual button's size |
| Ready and sent | Send followed by an inline result and Show Request | Toast and Show Request in the same action slot |
| Failure | Inline fixture error | Toast, with Send still available |
| Unverified | Warning before Send | Warning before Send in reserved space |
| Enable and enabled | Enable followed by Send | Same card action slot, with an enabled toast |

The tabs and search field moved down 36 px after a successful send and 18 px
after an injected failure on the base revision. Both moved 0 px on the head
revision in light and dark. The surrounding Enable DashPay banner still
changes height when it disappears, tracked in desktop issue #1140.
