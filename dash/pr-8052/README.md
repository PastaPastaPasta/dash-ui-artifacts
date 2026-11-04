# dashpay/dash#8052: reserving again after a release keeps the shared masternode contribution earlier replies hold, before and after

PR: https://github.com/dashpay/dash/pull/8052

## Provenance

| Run | Commit | `dash-qt` sha256 | `dashd` sha256 |
|---|---|---|---|
| Before, exact PR base (develop) | `9e5e3d59a1e3e0fbbba7d8038ffd07e796322a6a` | `04168e9f89e48656639d44ea6384a73a09e09e2bc0e0d1b96528d8a10fab92c5` | `e7df19d43914e24bd64a05f677ae35b0815ea44ecab23bd33863572da7a08bbf` |
| Before, `v24.0.0-rc.7` tag, where QA found it | `111a2c533e1998028fce341995c297d1fcbc16bd` | `62c94be03a20e1e6a2e4a1b79884e21b5a3be6ad0a8c7771a6d5042fecde70a8` | `635e0e8e42bba13f4bc7b0c5a28b6890ea064229b8fa4e579f093397c4a6d409` |
| After, full PR head | `eb4929384856ece6e17391d290ca326639926dad` | `f90e2c6cc5c43c3889558cc8ec5dcea825bea0a3e263847bd0cf2889230652ae` | `75095d20831954823e198743e0756a20e39c82f9b06bb1bd0b427870d76c51a1` |

- **Builds:** Linux x86_64 `--enable-debug --enable-werror` from depends, each built from the exact tree of its commit.
- **rc.7 tag:** the tag is signed. In `sharedmncreatedialog.{cpp,h}` and `mnsharesession.{cpp,h}`, rc.7 and the PR base are byte-identical. The rest of the Qt tree differs between them.
- **Reproducibility:** rebuilding the PR head from a clean tree reproduced the same `dash-qt` byte for byte.

## Fixture and steps

The steps were identical on each binary. Each run used its own fresh regtest chain with v24 active, at about height 621, with throwaway wallets. So txids, addresses, session IDs and codes differ between runs. That's the one variable not held constant.

1. **alice (coordinator):** Start a Shared Masternode, alice 500 / bob 500, otherwise defaults. On Your contribution, Reserve Coins, confirm the operator key, Save Invitation….
2. **bob:** Open File… with the invitation, pick share 2, Reserve Coins and Copy Details.
3. **alice:** Back twice to Your contribution, **Release**, paste bob's Details, **Next**. Next reserves again. Then Continue to Invite participants (image 1).
4. **alice:** Lock Terms → Lock and Approve → Copy Locked Terms.
5. **bob:** Open File… with the locked terms, in the same waiting dialog (image 2).
6. **After run only:** approve, sign, Broadcast Registration, mine (image 3).

On every run, alice's `listlockunspent` was `[]` after Release, `[]` after the paste, and her original outpoint again after Next.

## What changed: alice's contribution in each message

These are extracted from the saved message files; see [`change-addresses.txt`](change-addresses.txt).

| Run | Session | alice's input | Change in the invitation and bob's Details | Change in the locked terms |
|---|---|---|---|---|
| Before, PR base | `5B9BAC` | `2af1acaeab40…:1` | `ySqLCRPRkLYSB8eRw5DkgkTM6n2dwsbWsu` | **`yfQXtRxJDkiRj3gTVNikrjgXmT7Aia6sJi`** (new) |
| Before, rc.7 | `7CA8F9` | `559ba1f31933…:1` | `yXjituUXX4Fmjc5N6avdaKutDobJku1oXW` | **`yMzFpiALC7EQFwqx3iNpgC2ryf7K6UGiST`** (new) |
| After, PR head | `7B5A0D` | `5014c08cdec5…:1` | `yUmNLxUbmYxpwitYsEmac8Y58BjctHmDbP` | `yUmNLxUbmYxpwitYsEmac8Y58BjctHmDbP` (same) |

The change amount is 999.999 tDASH in every file.

## Pairs

| Step | Before: exact PR base | Before: rc.7 | After: full PR head |
|---|---|---|---|
| 1. alice's board after the re-reserve | [before-base/1-board-after-rereserve.png](before-base/1-board-after-rereserve.png) | [before-rc7/1-board-after-rereserve.png](before-rc7/1-board-after-rereserve.png) | [after/1-board-after-rereserve.png](after/1-board-after-rereserve.png) |
| 2. bob opens the locked terms | [before-base/2-bob-opens-locked-terms-refused.png](before-base/2-bob-opens-locked-terms-refused.png) | [before-rc7/2-bob-opens-locked-terms-refused.png](before-rc7/2-bob-opens-locked-terms-refused.png) | [after/2-bob-opens-locked-terms-approve.png](after/2-bob-opens-locked-terms-approve.png) |
| 3. registration | not run: the before runs stop at step 2 | not run | [after/3-alice-registered.png](after/3-alice-registered.png) |

**Step 1** looks the same on all three: "2 of 2 replied", "Received bob's Details", with no warning to ask anyone to reply again. That is the problem before the fix. The board gives the coordinator no sign that the re-reserve made bob's reply out of date.

**Step 2:**
- **Before** (both runs), bob gets the red "The locked terms do not contain the details you sent." and stays on "Waiting for alice".
- **After**, bob gets **Approve terms**, with "Received alice's Locked Terms · Code B0E9-DE2E" and Approve and Copy Reply enabled.

**Step 3, after only:** the ProRegTx `9199914641e3d87fc29d76aee2b897f65d7486d6d911930876db66b8ec99adf5` confirmed. Its change output pays 999.999 tDASH to `yUmNLxUbmYxpwitYsEmac8Y58BjctHmDbP`, the change address bob's Details listed. Afterwards neither wallet held a lock. See [`after/registration-confirmed.txt`](after/registration-confirmed.txt).

## Not shown

These are covered by the PR's unit test, `SharedMnWizardTests::reservingAgainKeepsEarlierReplies`, not by screenshots:
- the reply that lists another of this wallet's coins under alice's name, paying its change elsewhere;
- the fee-change fallback.

GUI checks on the earlier PR head `46de5fe1dea` (before review) also exist: the participant-side release and re-reserve, and a fee change after a reply. They're not published here, because they were taken on that earlier commit.

## About these images

- **Capture:** window crops (title bar included) of 902×768, from full-screen captures, with no scaling or annotation.
- **Content:** no operator secret key, "Save operator key" page or wallet dump is shown. All addresses and txids are regtest-only.
- **Hashes:** [`SHA256SUMS`](SHA256SUMS).
