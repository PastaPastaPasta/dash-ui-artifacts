# dashpay/dash#7905: a send refused at broadcast

- Before: exact base `6dedab5bc7b002c2231a9ca264d70411ff7f4483` (develop)
- After: full PR head `29e1f07a75b86c9be47bf303e89db26fa9a17add`

## How these were captured

Both images come from `test_dash-qt WalletTests` (`QT_QPA_PLATFORM=cocoa`, macOS arm64). A capture-only harness was added locally to `TestGUI`; it is not part of the PR. The same harness ran on both revisions:

- the fixture is the test's regtest chain (`TestChain100Setup` plus 5 blocks), the wallet holds the coinbase key, and two earlier sends of 5 and 10 tDASH have gone through;
- the Send tab is filled with 2 tDASH to the address of the all-zero key hash (`yLKSrCjLQFsfVgX8RjdctZ797d54atPjnV`), and Send is clicked;
- after the transaction is prepared, before the confirmation is accepted, the wallet's `-maxtxfee` ceiling is lowered to 1 duff, so only the broadcast refuses it. That refusal carries no mempool reason, so the PR shows its generic "Transaction could not be broadcast" text. A mempool refusal such as `txn-mempool-conflict` shows the mempool's reason in the same place;
- widgets are grabbed with `QWidget::grab()`. The error dialog is built the way `BitcoinGUI::message()` builds a modal message with a title, from the exact title, text and style the dialog emitted. The test has no main window, so the dialog is grabbed on its own.

The refused transaction's txid differs between the runs (`5ba26410…` before, `c9c580e9…` after) because the change address comes from a freshly generated wallet each run. Everything else is the same.

| | Before (base) | After (PR head) |
|---|---|---|
| Message shown | none; `coinsSent` emitted | one error: "The transaction was not sent: Transaction could not be broadcast"; no `coinsSent` |
| Send form | cleared | kept (2.00000000 to the same address) |
| Transaction | pending `Sent to` −2.00000191, never relayed, in neither mempool | abandoned (trash icon) |
| Spendable balance | 1984.99999618 (its 500 tDASH input is spent by a transaction that never left the wallet) | 2484.99999618 (unchanged) |

## Files

- `comparison/before/send-tab.png`: `bd42d0e326b440f07e164758be61108d77a3e6514f4a439ddda57fdd8eccf233`
- `comparison/before/transactions.png`: `4f982507d6ee03228de035589c89e8d892982aaf93ecb0d78accde213ac612bb`
- `comparison/after/send-tab.png`: `8bdb59e0123d920ed695a22645a3c78b413bc6c55c921f31c8c413cd3ecd2daf`
- `comparison/after/error-dialog.png`: `c1469c8c7d42c2d714fed5511cc09c5e32b8cc4aaa1f4e20f0216ab528c6f0bd`
- `comparison/after/transactions.png`: `c2b30c51715b03e37c9e1d874d18adc2e849a9de920e001e43c3084138342a9a`
