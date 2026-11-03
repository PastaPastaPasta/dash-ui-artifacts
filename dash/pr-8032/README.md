# dash#8032: reopening a saved shared-masternode session offered a new operator key — before/after evidence

All screenshots are real captures of `dash-qt` on a disposable **regtest** network with a throwaway wallet (`alice`). No mainnet or testnet funds were used. The one image that showed an operator secret (`before/2-…`) has both secret fields painted over. The unmasked capture was never uploaded.

## Builds

| Column | Source | `dash-qt` sha256 |
|---|---|---|
| **Before — exact base** | `dashpay/dash` develop `bf9a6cb3dc473dbbb6f72d69ea0bca25a5fd080b` | `7f7ddd2c5d2e866fd387a24ea6460b998e577c56d4dea0ccb76612674cca1dc6` |
| **After — full PR head** | `0a1d36c923013ecd8424d8ba509a59b889dc7915` | `c56b8f04602dd20b8ff50ef5a6c1ebeef57e85e654b946a769fdf95fc5fc6751` |

Both builds came from the same worktree with the same configuration (`--enable-debug`, depends prefix). When the base was built, the only uncommitted change was the new regression check in `src/qt/test/sharedmnwizardtests.cpp`. That file is compiled into `test_dash-qt` only, not into `dash-qt`, so the base `dash-qt` sources match `bf9a6cb3dc4`. Both builds report `/Dash Core:24.1.0/`.

## Shared fixture

- One regtest chain at height 621 with v24 active. The `alice` wallet was funded with 1 500 tDASH.
- With the **base** build, alice started a shared masternode session (session `78FEA3`), two participants at 500/500 tDASH. She kept "Generate a new operator key", confirmed that key's secret on *Save operator key*, reserved her coins and reached *Invite participants*.
- She saved it with *Save Invitation…* to one JSON file. Session operator public key: `a1b66933540adffb092c7b6326d4791d6e9cb4df65332a19a43be7cf05016457aa1c9a80e01e5333ac9ef09d66508a05`.
- That **same file** was then reopened with *Shared Masternode… → Open File…*, once by the base build and then, after restarting the same wallet, by the head build. Both reopen as coordinator on *Invite participants* with fingerprint `B5A7-2964`.

## What each pair shows

| Step | Before — exact base | After — full PR head |
|---|---|---|
| Reopened via Open File… | `comparison/before/1-reopened-invite.png` | `comparison/after/1-reopened-invite.png` |
| Press **Back** once | `comparison/before/2-back-new-secret-MASKED.png`: "Save operator key — Save it now — the invitation cannot go out until you confirm it" with a **new** secret (masked). | `comparison/after/2-back-contribution.png`: Back goes to "Step 4 of 5 · Your contribution". There is no secret page. |
| Back twice more | — | `comparison/after/3-settings-session-key.png`: *Masternode settings* shows the session's own operator public key `a1b66933540a…f09d66508a05` read-only. |

To check the "before" secret without publishing it, it was copied with the page's Copy button and its public key derived with `bls fromsecret`. The result, `a5ff3be5c91d86cbdc6556f56925fa7c5866bf0d7634aa269c24c0749ff96a5557d9970e2877df2e66d90b050c68a6d7`, is not the session key `a1b66933…508a05`.

## File hashes (sha256)

```
2945e1fe6a63efbf7f9a3210af167e147112cd72826a64e62171236f227d1c94  comparison/before/1-reopened-invite.png
9143deb6c637cde447c63876aa4c8a15cebc81d7041e3f37b1f73f3e3be6b1a4  comparison/before/2-back-new-secret-MASKED.png
789ece2bee08693151a8dd1836b90dd41407e935962f0ff14b70d48c231e3dee  comparison/after/1-reopened-invite.png
a3c62a9a9edd522647abe43681facf32b945cd0534bd595a2a462e065e1d7be6  comparison/after/2-back-contribution.png
ea28b7a6c968606c3d3e6a45c08995d62b0f5e48d2a9c79dcbf9a699543d80c6  comparison/after/3-settings-session-key.png
```
