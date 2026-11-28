# Stable feedback and copy controls

| Comparison | Commit |
| --- | --- |
| Before, exact `main` revision merged into the branch | `2f230f1abd9736ca0c19a5844b9e098b2de65c16` |
| After, PR head | `5fd407435ad2646f9d2da8b45b229128c2df0dcc` |

Each PNG shows Before on the left and After on the right. Both builds use the same
fixture scenarios in Chromium 1.64.0 at 1280 × 820, except My QR at 920 × 620.
The transaction detail samples use fixture transaction
`6813bb0604077876c8c7a76b7f7b44d1a6bb41bd702b5c3bb95be65eee60942d`.
The forced-color captures use Chromium's light system palette and the indicated
wallet theme.

| Flow | Evidence |
| --- | --- |
| Add Contact | Search results, selected and sent states, and the refined search before, during and after a held query |
| Contact and notification requests | Request and accepted states in the contact pane, bell popover and full Notifications page |
| Enable DashPay | Before and after the fixture authorization |
| My QR and share username | Loading and available QR, the full Copy Link button at 920 px, and the shared profile sheet |
| Copy icon | Transaction details at rest, hover and keyboard focus, plus the light system contrast palette |
| Activity | Invalid filter feedback and CSV export outcome |
| Address Book | CSV export outcome and the QR in loading, ready and injected failure states |

The Playwright guards compare the selected action's bounding box while search is
refined, check that My QR's copy action fits at minimum width, and assert at least
3:1 contrast for the copy glyph. Address Book's error capture injects a fixture
encoder failure and retains the payment link below the reserved QR area.
