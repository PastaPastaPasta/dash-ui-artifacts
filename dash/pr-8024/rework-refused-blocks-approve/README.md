# dashpay/dash#8024 rework: a refused Dissolve Together message blocks Approve

PR: https://github.com/dashpay/dash/pull/8024

This folder supersedes the B3 pairs in the parent folder's README. Those showed the earlier "This message was ignored. The request here (Code …) is unchanged." behaviour, which the maintainers rejected and the PR replaced. The B2 (Dissolve Now fee preview) pair in the parent folder still applies; that commit is byte-identical (`22bf130a546`).

## Provenance

| | Commit | `dash-qt` sha256 |
|---|---|---|
| Before — previous PR head | `ce13eda1bfa1220bcb4ff5031f630a825af19963` | `7b34bbe79753a1849b0ed377a1e72d2712d4c401237e9f919114729f1dbd5080` |
| After — full PR head | `018c46dde78c653483d520d5915259d7d153ecba` | `35bf2fe81451c4c6e364ca9826dbf0aa8f27c3b4c9bb959bff592e91edaa662e` |

"Before" is the previous PR head, which includes the rejected "ignored" line. On the base `bf9a6cb3dc4` the same screens show only the refusal reason, with Approve likewise enabled; see the parent folder's `before/B3-*.png`. Both binaries are Linux x86_64 `--enable-debug` depends builds.

## Fixture (identical for both runs)

- Throwaway regtest chain, height 625, with v24 active.
- One shared masternode, ProTx `047da6e9b7e33e0a99611391776e2c03805102506e0755a7d313d34d0a0b9367`. Share 1 (alice) is 500 DASH and share 2 (bob) is 500 DASH.
- The request was prepared and approved by alice (Code `6095-C156`) and saved to a file. Two refused copies were made from it:
  - **Altered payout:** the 500 DASH output for bob's share is redirected to a script bob doesn't own.
  - **Wrong network:** `"network": "main"`.
- Everything below is bob's `dash-qt`, Dissolve Together tab, same datadir and files in both runs. The binary was swapped between runs.
- Sequence, the same in both runs, via Open File…:
  1. genuine → altered payout *(shot)*
  2. genuine → wrong network *(shot)*
  3. genuine again *(shot)*

## Pairs

| Step | Before | After | What it shows |
|---|---|---|---|
| Genuine request loaded, then the altered-payout file opened | [before](before/altered-payout-after-genuine.png) | [after](after/altered-payout-after-genuine.png) | Before: the refusal plus "This message was ignored…", and **Approve and Copy Reply is enabled**; clicking it would sign the genuine request. After: the refusal text is unchanged, followed by "This dissolution cannot be approved.", and **Approve is disabled**. |
| Genuine request loaded, then the wrong-network file opened | [before](before/wrong-network-after-genuine.png) | [after](after/wrong-network-after-genuine.png) | Same as above for "This message is for the main network; this wallet runs on regtest." |
| Genuine request opened again (recovery) | [before](before/reopen-genuine.png) | [after](after/reopen-genuine.png) | After: the block is lifted. Approve is enabled again, there is no error line, and the request (Code 6095-C156) and its approvals (1 of 2) were kept throughout. |

Each image is an uncropped capture of the Dissolve Shared Masternode window, title bar included, at original resolution. No keys are shown.

## sha256

```
    e7f3e5de84edec84499e8f8a0680513bb6467ff30d5d9b0eefc38166f77baf63  before/altered-payout-after-genuine.png
    50068d84172280c4e497c5e88c3bdf31a78a219749a9857a046a6317fa5376c2  before/reopen-genuine.png
    1a29defe0d52bb528c1601de88903831b4b03f5e0a207917cb7032f97a9eca5b  before/wrong-network-after-genuine.png
    993e2d782e7893314bdb871f0532d9c02d9ad0cc156d587548fe866f8ba9877c  after/altered-payout-after-genuine.png
    500cb271bebfdbdc58119c7d1f87c090a88977f997444d8406e1ed721e0a9b36  after/reopen-genuine.png
    1f78048ee9c0f292cb30503182cbe83a212f8e4df4fc8f47e16a482fa2228699  after/wrong-network-after-genuine.png
```
