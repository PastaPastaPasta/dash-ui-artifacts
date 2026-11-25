# Reset-wallet metadata dialog at short heights (PR head `bc9351517`)

The shared `ModalDialog` lays out as on base unless a caller opts in to a scrolling body, and only the identity-mismatch dialog does. These captures check the reset dialog, whose "Reset wallet without saving" is destructive, at short window heights.

| | |
|---|---|
| Build | `assemble_testNet3Debug` from the `bc9351517` tree (the build predates a doc-comment-only edit in that commit) |
| Device | Android emulator, API 36, 420 dpi, window resized with `wm size` |
| Fixture | Testnet wallet `orphanclaim4829` with a DashPay identity and never-published transaction metadata, so Security → Reset Wallet → Reset wallet shows this dialog |

- `reset-dialog-1080x1300.png` (about 495 dp tall): the heading and the metadata-loss warning are fully visible above "Reset wallet without saving".
- `reset-dialog-1080x1000.png` (about 380 dp tall): the warning is still fully visible; the buttons are what gets cut off, not the warning.

SHA-256:
721cdf0c73bfe4df86c87853af0407ca3f31cf19180bc6c69991d46b9c14bea1  reset-dialog-1080x1300.png
962017780c0413e5c7b9597680fad8c45cdd3c6d9941d3bc713f660a771fbc6f  reset-dialog-1080x1000.png
