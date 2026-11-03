# dashpay/dash#8024 — shared masternode Dissolve dialog: before/after

PR: https://github.com/dashpay/dash/pull/8024

## Provenance

| | Commit | `dash-qt` sha256 |
|---|---|---|
| Before — exact base (`develop`) | `bf9a6cb3dc473dbbb6f72d69ea0bca25a5fd080b` | `6aa0852e34258525d7073eec7f5320c2d1837ac893f9c5475386904866f549cd` |
| After — full PR head | `ce13eda1bfa1220bcb4ff5031f630a825af19963` | `7b34bbe79753a1849b0ed377a1e72d2712d4c401237e9f919114729f1dbd5080` |

Both are Linux x86_64 `--enable-debug` builds from depends. The miner node ran `dashd` from the base commit for both runs; that doesn't affect these dialogs.

## Fixture (same for both runs)

- Throwaway regtest chain with v24 active, a miner `dashd`, and two `dash-qt` wallets, alice and bob. All data is regtest-only.
- One shared masternode, ProTx `047da6e9b7e33e0a99611391776e2c03805102506e0755a7d313d34d0a0b9367`, registered at block 624 with `protx shared_register_prepare`/`shared_sign`/`shared_combine`.
  - Share 1 is alice's 500 DASH and share 2 is bob's 500 DASH.
  - Early-exit penalty 50 DASH, early period 40 blocks.
- Every screenshot was taken at height 625. The "before" GUIs were stopped and relaunched on the "after" binary with the same datadirs.
- Dissolve Together request: prepared and approved by alice (Code `6095-C156`), saved to a file, then opened by bob.
  - Tampered copy: the 500 DASH output for bob's share is redirected to a script bob doesn't own.
  - Wrong-network copy: `"network": "main"`.
  - The same three files were used in both runs.

## Pairs

| Scenario | Before — exact base | After — PR head | What it shows |
|---|---|---|---|
| B2: alice → Dissolve Now, type `0.5` as Fee, press Tab | [before/B2-fee-0.5-preview.png](before/B2-fee-0.5-preview.png) | [after/B2-fee-0.5-preview.png](after/B2-fee-0.5-preview.png) | The field clamps to 0.01 in both. Before: "Share 1 of 2 (you)" still receives **449.5** (the 0.5 fee). After: it receives **449.99** (the 0.01 fee that is actually sent). |
| B3: bob → Dissolve Together, open the genuine request, then the tampered copy | [before/B3-tampered-after-genuine.png](before/B3-tampered-after-genuine.png) | [after/B3-tampered-after-genuine.png](after/B3-tampered-after-genuine.png) | Before: "This request does not pay every share its full principal. Do not approve it…" sits next to the genuine payouts and an enabled Approve button. After: a second line says "This message was ignored. The request here (Code 6095-C156) is unchanged." The payout table and buttons are the same in both. |
| B3: same, with the wrong-network copy | [before/B3-wrong-network-after-genuine.png](before/B3-wrong-network-after-genuine.png) | [after/B3-wrong-network-after-genuine.png](after/B3-wrong-network-after-genuine.png) | Same as above for "This message is for the main network; this wallet runs on regtest." |

All images are uncropped captures of the Dissolve Shared Masternode window, title bar included, at original resolution. No keys are shown.

## sha256

```
    e87bc1d9dfcf686ba670f2b40fafbf7b03a191c6ceaa83f529c626450b9b620e  before/B2-fee-0.5-preview.png
    82c3f21b68258138d2d614c1ef8fa127013b2c998aa3f79c8da3b04dfbec2fb1  before/B3-tampered-after-genuine.png
    ce889c2ba09ce65578a0602dfb60ac1339b2411e2c5fdd7d5d301d5fe0452953  before/B3-wrong-network-after-genuine.png
    76be18c3ad60ad65198e657ab0b6edd403aa27f166a97f4e97b0de339a74d4a3  after/B2-fee-0.5-preview.png
    947008a8a30987753cb08556e295809826628d56de0b485d9791622bc09bfcd9  after/B3-tampered-after-genuine.png
    4f02b69f12ca1be4e19d64f8f7c5ea51477a50d17748f66b3498cbfa32898d45  after/B3-wrong-network-after-genuine.png
```
