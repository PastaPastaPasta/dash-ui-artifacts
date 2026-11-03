# dashpay/dash#8035 — before/after evidence

fix(qt): don't strand coins reserved for a shared masternode session

- **Before** = `dash-qt` built from base `bf9a6cb3dc473dbbb6f72d69ea0bca25a5fd080b` (develop).
- **After** = `dash-qt` built from PR head `8d1800ee44c7aff542d149c78a302b36aef4d7a3`.
- Same configure for both (`--enable-debug`, depends prefix). Every image is a real, live `dash-qt` window, not a rendered test.
- The regtest miner `dashd` was the base build in both runs; it only relays and mines, and the GUI wallets each run their own node.

Binary sha256:

```
base/dash-qt 261c51310750db937296b8005cd33a9a1515ab8e700a57a10b630f762d52c501
base/dashd   33ca73130118657c28e3bc5b547a4c293334613ed3337d80885c2f7dfe25686f
head/dash-qt 22e03392acb09fd5bba24bea9e08375b2842a3fdb0e3b4ae8665cfd1a79499aa
head/dashd   d200d75a9a6496955e705b24b8def28c2c7ae77762e6c208fd7a8230a6b8b676
```

## Fixture

- Regtest, v24/DIP3/v20 active, height 624. One miner `dashd` and two `dash-qt` wallets, alice (1500 + 10 + 10 tDASH) and bob.
- bob paid alice 10 tDASH twice. The second payment, `d65dbfa4c1f8c97e6184e9b68b145038cb701f55e6848f1e81ed53e36fa0f83c`, is in alice's wallet. Its output 1 is bob's 1179.999955 tDASH change, which bob then reserves for his share. This is the "both wallets know the transaction" case.
- Session CB5D27: alice coordinates, with shares alice 500 and bob 500. It uses an existing operator **public** key, so no operator secret ever appears.
- alice reserved `b7df189ee1fb130a91309e90ee407ba1a87aa0f8be436ff8dcb7345687a8a76d:1` (1500 tDASH); bob reserved `d65dbfa4…a0f83c:1`.
- One saved session file, alice's Invite page after bob's details were absorbed, was opened in both runs. It was made once with the base build.
- Before each run every lock was cleared with `lockunspent true`, so each run starts from zero locks.
- Coin Control was enabled through a private settings directory used by both runs.
- All keys, addresses and coins are throwaway regtest data.

## 1. Only this wallet's own coins are reserved (commit 1)

alice opens the saved session (Masternodes → Shared Masternode… → Open File…), then Send → Inputs….

| | Image / file | What it shows |
|---|---|---|
| before | `item1-own-coins-only/before-coin-control.png` | Coin Selection says **(2 locked)** but only one row (alice's 1500) carries a lock: the other lock is bob's coin, which alice can neither see nor unlock |
| before | `item1-own-coins-only/before-listlockunspent.txt` | `b7df…a76d:1` (alice) **and** `d65d…f83c:1` (bob) locked in alice's wallet |
| after | `item1-own-coins-only/after-coin-control.png` | **(1 locked)**: alice's own coin, the one locked row |
| after | `item1-own-coins-only/after-listlockunspent.txt` | only `b7df…a76d:1` |

## 2. Closing offers keep/discard while coins are reserved (commit 2)

alice opens the same saved file (an unchanged session) and presses Cancel.

| | Image / file | What it shows |
|---|---|---|
| before | `item2-close-prompt/before-1-opened-from-file.png` | Invite page right after opening the file |
| before | `item2-close-prompt/before-2-after-cancel-no-prompt.png` | Cancel closed the wizard at once: no prompt |
| before | `item2-close-prompt/before-listlockunspent-after-cancel.txt` | both coins still locked after the dialog closed |
| after | `item2-close-prompt/after-1-opened-from-file.png` | same page; byte-identical to the "before" image (nothing differs until Cancel) |
| after | `item2-close-prompt/after-2-cancel-prompts.png` | Cancel now asks **"Keep this session for later?"** (Save and Close / Discard and Release Coins / Cancel) |
| after | `item2-close-prompt/after-listlockunspent-after-save-and-close.txt` | after choosing Save and Close: alice's coin stays reserved, as the user chose |

The participant's "Close" on the waiting-for-broadcast page needs a fully signed session, so the GUI wasn't driven there. It is covered by `SharedMnWizardTests::signedSessionReservation`.

## 3. "Release my coins" stays released (commit 3)

bob opens the invitation, picks his share and presses Reserve Coins and Copy Details. He saves his details, presses Release my coins and confirms Release, then uses Open File… on the details he just saved.

| | Image / file | What it shows |
|---|---|---|
| before | `item3-release-sticks/before-1-released.png` | "Released — these coins can be spent again."; Release my coins gone |
| before | `item3-release-sticks/before-2-reopened.png` | after reopening: **Release my coins is back**, while the status line still says "Released" |
| before | `item3-release-sticks/before-listlockunspent-after-reopen.txt` | bob's coin `d65d…f83c:1` is locked again |
| after | `item3-release-sticks/after-1-released.png` | same released state |
| after | `item3-release-sticks/after-2-reopened.png` | after reopening: no Release my coins, and the "Released" line is true |
| after | `item3-release-sticks/after-listlockunspent-after-reopen.txt` | `[]`: nothing locked |

Each run made its own reservation, so the details file and its message code differ between the runs (2BF3-C71B before, 744C-B902 after). The coin reserved is the same in both, `d65d…f83c:1`.

Commits 4 and 5 (the reason for "Start Over", and the own row fixed while reserved) are covered by tests only. See the PR.

## File sha256

```
1683c61b784566f743e91d46f4ed51c1ff2d6b3f243804226480b8106ec3404f  item1-own-coins-only/after-coin-control.png
94a90c9856667c2cfce00bd5a9ff6660d0237007a85394ac332a813098c58b2a  item1-own-coins-only/after-listlockunspent.txt
07c2836a5939a4256e1e61611193af67cdb42d1bd8db5e2a79b433080e1a8a5a  item1-own-coins-only/before-coin-control.png
246410ba76645f860f631983d5ec750b8ea2c2889d168d45127e2bca30d6a69d  item1-own-coins-only/before-listlockunspent.txt
ec58b477d7883cb4de35e44a3d5de602be56facfbbc92d235ac93120b9fe118c  item2-close-prompt/after-1-opened-from-file.png
f949bc0ae0ad9910de396f72f373ac7c26fbfdd8bdf1437a82f691b56fe375a3  item2-close-prompt/after-2-cancel-prompts.png
94a90c9856667c2cfce00bd5a9ff6660d0237007a85394ac332a813098c58b2a  item2-close-prompt/after-listlockunspent-after-save-and-close.txt
ec58b477d7883cb4de35e44a3d5de602be56facfbbc92d235ac93120b9fe118c  item2-close-prompt/before-1-opened-from-file.png
8632bc447ca65c7ddf2af8e44250d893d2def14e1b5354efffb601b9413bc9e1  item2-close-prompt/before-2-after-cancel-no-prompt.png
246410ba76645f860f631983d5ec750b8ea2c2889d168d45127e2bca30d6a69d  item2-close-prompt/before-listlockunspent-after-cancel.txt
8e35068802a878ada1b0004448a948221bbe0fa754647f6f3cdd44252faf860d  item3-release-sticks/after-1-released.png
5732e30d01b9be9aa0da71817095f4a36b53072ba67c20a6c4cb9e8f93f3e544  item3-release-sticks/after-2-reopened.png
3fbbd4c6d76130399b0c79cdf41758669224a91e05b7b216953f0c9728750865  item3-release-sticks/after-listlockunspent-after-reopen.txt
42482d8f4eaab8dbcb6627b07b3c141146e657722ed09f1c5ed4355cadd99a16  item3-release-sticks/before-1-released.png
233d60e94e6c6bb8a38f6fd2e7fa9aeca98d61838cd914a377d04cdcfca00917  item3-release-sticks/before-2-reopened.png
68f4370e0cf288ab731e66d555560bb312abb6cb70a83cb2fc80c0088f330fdf  item3-release-sticks/before-listlockunspent-after-reopen.txt
```
