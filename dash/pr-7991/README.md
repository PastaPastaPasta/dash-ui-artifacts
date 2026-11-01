# dashpay/dash#7991 — shared masternode wizard: evidence

## Before/after comparison (`comparison/`)

| | Revision |
|---|---|
| Before (exact base) | develop `6c9bfcade97ed5c2b8dcbdee42fe15b61b74e434` |
| After (full PR head) | `e6b3e4a221eb37e3616e9223789264d6b35734c9` |

Both sets come from the walkthrough test `SharedMnWalkthroughTests::walkthrough`, which registers a real shared masternode in-process on regtest. Each revision was built and run on its own (`QT_QPA_PLATFORM=minimal:enable_fonts`, `DASH_QT_SHOTS_DIR`). The same capture-only patch went onto both trees and was never committed. It does three things:
- makes wizard pages taller (`DASH_QT_SHOTS_HEIGHT=1900`), so the whole term sheet fits;
- opens the share picker and widens its popup, so each entry shows in full;
- makes the broadcast confirmation 900 px wide with "Show Details…" open.

Tall captures are trimmed to the content plus the bottom button bar, and each pair has the same framing.

The wallets and keys are created fresh on every run, so addresses, keys, session codes and transaction IDs differ between the two columns. Two fixture differences come from the PR itself, which changed the walkthrough so Alice sends all her coins to herself before reserving:
- On the Approve terms page, "Change returned" totals differ between columns.
- After the PR, the broadcast confirmation reports one input it cannot value yet: Alice's unconfirmed change, which the coordinator's node cannot see in its UTXO set.

| # | Screen | What changed |
|---|---|---|
| 01 | Participant: Your share | The picker starts on "Choose your share…" instead of looking as if the coordinator's share is selected |
| 02 | Participant: picker open | The coordinator's share is marked "(taken)" and cannot be chosen |
| 03 | Participant: waiting page | "Copy My Reply" copies the reply again |
| 04 | Coordinator: lock terms | "✓ in this wallet" next to the coordinator's own addresses |
| 05 | Participant: Approve terms | "Your contribution: 300 tDASH (… in, … change back)" and wallet marks |
| 06 | Coordinator: Signatures | The term sheet again, with a note on what the approval covers; Copy Signing Request pinned under the scroll area |
| 07 | Participant: Sign contribution | The full term sheet again, with a note on what the approval covers |
| 08 | Coordinator: broadcast confirmation | "Show Details…" shows the transaction ID and the whole term sheet, not just the session code |

## Hands-on testnet QA (`qa-testnet/`)

Real Dash-Qt windows were driven through the GUI on Dash testnet: three separate instances (coordinator, P1, P2) with their own wallets, funded from the testnet faucet. The build was `3d4f99b64fa1`, which matches the PR head except for the sign-page note wording changed in `e6b3e4a`.

The 400/300/300 registration was broadcast and confirmed. proTxHash `38c3acb9c3fb86efc51133ae2021167fb27f33e3021d1fe2771e83af009d8aa4` was registered at height 1583595.

Each screenshot shows:
- `012` — coordinator reserved its coins.
- `020` — participant picker starts on "Choose your share…".
- `183` — Coordinator "(taken)".
- `181` and `182` — switching shares loads a fresh address for the other share and restores P1's addresses when switching back.
- `050` — P2 chose P1's share from a stale invitation. After importing the update, it moved to share 3 and does not show P1's addresses.
- `070` — P1's Approve terms page: "Your contribution 300 (449.99999809 in, 149.99999809 back)". P1 funded the share from its own unconfirmed InstantSend-locked change.
- `092` — P1's sign page with the full term sheet.
- `100` — broadcast confirmation details with the transaction ID.
- `102` — Complete page.
- `103` — after Finish, the application stays open.
- `171` — Masternode details: P1's share marked "(you)".
- `143` — two participants reserved the same share. The coordinator refused the second reply, and each wallet kept only its own coins locked.
- `180` — reserving with an owner address outside the wallet is refused.
- `151` — after the coordinator edited a participant's change in the session file, locking is refused.

`REPORT.md` is the full QA report, with every step's verdict and transaction IDs. All funds are testnet. No keys appear in any screenshot.

`SHA256SUMS` lists the hash of every image.
