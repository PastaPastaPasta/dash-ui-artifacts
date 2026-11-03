# dashpay/dash#8026: shared masternode contribution fields after Reserve Coins, before and after

PR: https://github.com/dashpay/dash/pull/8026

## Provenance

| | Commit | `dash-qt` sha256 |
|---|---|---|
| Before: exact base (`develop`) | `bf9a6cb3dc473dbbb6f72d69ea0bca25a5fd080b` | `b1cd37d55d78828c1ca0df1fcc6cd191f19c2d30b2e3363f7c18e863318aea07` |
| After: full PR head | `f0dd5a49137ff8ac0019789169041086f4aaf932` | `8ddd61069a28f34e84f6da584e371c40e2372aa2052d47ea43808a81cfae42ca` |

Both are Linux x86_64 `--enable-debug` builds from depends. The "after" `dash-qt` is byte-identical to a rebuild from the clean, committed PR head. The miner node ran `dashd` from the base commit in both runs. It only mines blocks, so it doesn't affect this page.

## Fixture

- **Chain:** a throwaway regtest chain with v24 active, at height 621.
- **Wallets:** a miner `dashd` and two `dash-qt` wallets, alice (coordinator, 1 500 DASH in one coin) and bob (participant). All data is regtest-only.
- **Same in both runs:** wallets, chain and window size (1920x1200, wizard maximized). Two participants with 500/500 shares, service `127.0.0.1:29465`, early period 0, penalty 0. "Use an existing operator public key" was chosen, so no operator secret is ever shown.
- **Different between runs:** each run is its own session (Session `0C5A89` before, `186116` after), so the owner, refund, change and operator public key values differ between the runs. They are fresh wallet addresses or a fresh key in each. Compare each image with its own run's values, given below.
- **Steps, both runs:** alice clicks **Reserve Coins** on "Your contribution", then **Use new address** next to the refund address, then sets **Network fee** to 5 and presses Tab. Bob then opens alice's saved invitation, clicks **Reserve Coins and Copy Details**, and alice pastes the reply and clicks **Lock Terms**.

## Pairs

| Scenario | Before: exact base | After: PR head | What it shows |
|---|---|---|---|
| "Your contribution" right after Reserve Coins, refund **Use new address** clicked, fee typed as 5 | [before/1-contribution-edited-after-reserve.png](before/1-contribution-edited-after-reserve.png) | [after/1-contribution-locked-after-reserve.png](after/1-contribution-locked-after-reserve.png) | **Before:** the refund field changed from the reserved `yPqTCRD5…LrxvE` to `ycwosqxQ…RwcMmV` and the fee reads 5.00000000, yet the coins line still says change 999.999 (the 0.001 fee). **After:** the three **Use new address** buttons and the fee field are greyed out. The refund stays the reserved `yQ3x8WHG…VifdCTD`, the fee stays 0.00100000, and a new line says "To change your addresses or the network fee, release the coins first." |
| Lock card ("Lock these terms?") | [before/2-lock-card.png](before/2-lock-card.png) ([full window](before/2-lock-card-full.png)) | [after/3-lock-card.png](after/3-lock-card.png) ([full window](after/3-lock-card-full.png)) | **Before:** the lock card lists Refund `yPqTCRD5ictq2nwfpWd3KSG6Q3SVKLrxvE`, not the `ycwosq…` the page showed, and "Your contribution: 500.001 tDASH (… 999.999 tDASH change back)", not the fee of 5 the page showed. **After:** the user released, picked a new refund, set the fee to 5 and clicked Next to re-reserve, so the lock card lists the address and fee they chose: Refund `yVxPxLH3BE8NR4nPnPazXwn2EUAnbL7jRj` and "Your contribution: 505 tDASH (1 500 tDASH in, 995 tDASH change back)". The ⚠ line under it is the existing large-fee warning. |
| After only: Release, then refund **Use new address** and fee 5 | | [after/2-released-and-edited.png](after/2-released-and-edited.png) | Release turns the controls back on. The page shows refund `yVxPxLH3…L7jRj`, fee 5.00000000 and a change preview of 995, which is what the lock card above then carries. |

## Saved session files (Save… on the same session)

The files themselves aren't published. These are the relevant fields from alice's share (share 1) and contribution:

| | `shares[0].refundAddress` | `contributions[0].change.amount` |
|---|---|---|
| Before (saved right after the edits above) | `yPqTCRD5ictq2nwfpWd3KSG6Q3SVKLrxvE`, the old address, though the page showed `ycwosqxQNYiPCo41VacewrguMeBQRwcMmV` | `99999900000` (fee 0.001, though the page showed fee 5) |
| After (saved after Release, edits and Next) | `yVxPxLH3BE8NR4nPnPazXwn2EUAnbL7jRj`, the address shown on the page | `99500000000` (fee 5, as shown on the page) |

Crops are cut from full-screen captures at original resolution, with no scaling. The `-full` files are the uncropped screens. No secret keys are shown. The operator key on the lock cards is a public key.

## sha256

```
8771b6a2b3eb5604ac5e8f8f4819a1cc0c06c5b08f60d419ff9fd4be3633a9de  before/1-contribution-edited-after-reserve.png
33695f3a739468d0ae86b57b6826b6a81651c433582c8604c5afcf0c9a168fc0  before/2-lock-card.png
73b547478474ca6c450e5cb1b50a96a5f5368af0f235ed87c1857243399c43d6  before/2-lock-card-full.png
9c448f340053331fd33748a40287d790b9b3166a02b721c0e65ddefe55234bb4  after/1-contribution-locked-after-reserve.png
369a1886ffab70db0a214f0da9e774d4855c72ce91b79720f5873e628ac3a925  after/2-released-and-edited.png
636b5fe9cede8de8796ec993d070f0f2413068c080131174ebd8efddd9838ba1  after/3-lock-card.png
57ae268b5562b26938386766363d3d8c9dbb59dacfb435be589dfb2fef320f4b  after/3-lock-card-full.png
```
