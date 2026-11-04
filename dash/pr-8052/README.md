# dashpay/dash#8052: reserving again after a release keeps the shared masternode contribution earlier replies hold, before and after

PR: https://github.com/dashpay/dash/pull/8052

## Provenance

| Run | Commit | `dash-qt` sha256 | `dashd` sha256 |
|---|---|---|---|
| Before, exact PR base (develop) | `9e5e3d59a1e3e0fbbba7d8038ffd07e796322a6a` | `04168e9f89e48656639d44ea6384a73a09e09e2bc0e0d1b96528d8a10fab92c5` | `e7df19d43914e24bd64a05f677ae35b0815ea44ecab23bd33863572da7a08bbf` |
| Before, `v24.0.0-rc.7` tag, where QA found it | `111a2c533e1998028fce341995c297d1fcbc16bd` | `62c94be03a20e1e6a2e4a1b79884e21b5a3be6ad0a8c7771a6d5042fecde70a8` | `635e0e8e42bba13f4bc7b0c5a28b6890ea064229b8fa4e579f093397c4a6d409` |
| **After, current PR head** (`after-01cda37a/`) | `01cda37af25029961383752f44e91aeafe1e19f6` | `a5d88925a1e044ce7f9ca854c522ee5b2fb27c97e76b31357fdcfc25dd741f6a` | `fc589f9e4a505fa14a4be26097d05d80a852446b7a5c1f775e8fc3ccb3c6f08f` |
| After, earlier PR head (`after-55672100/`) | `55672100f0b08e1d6dc5bfb9d2060f86d58cf9ec` | `f4d8df6b666dfc7c36df0b04e0e2c7a01a673760c11ebb7daa000a1ca3741d75` | `7aab27149ac78143ba59897b5b23568af1586064d864748b59fe80a546268721` |
| After, earlier PR head (`after-496130ce/`) | `496130ce0637dad1367de129d3a7fd59e1a98973` | `de3f0785022f6f605b21ca099f756d087776035f8e92cc5c14dc956b3023179d` | `06246efbc2141330c3d1f8b51da8745f9a52126140c9dececc0cc2cea7627ae4` |
| After, earlier PR head (`after/`) | `eb4929384856ece6e17391d290ca326639926dad` | `f90e2c6cc5c43c3889558cc8ec5dcea825bea0a3e263847bd0cf2889230652ae` | `75095d20831954823e198743e0756a20e39c82f9b06bb1bd0b427870d76c51a1` |

- **Builds:** Linux x86_64 `--enable-debug --enable-werror` from depends, each built from the exact tree of its commit.
- **rc.7 tag:** the tag is signed. In `sharedmncreatedialog.{cpp,h}` and `mnsharesession.{cpp,h}`, rc.7 and the PR base are byte-identical. The rest of the Qt tree differs between them.
- **Reproducibility:** rebuilding `eb4929384856` from a clean tree reproduced the same `dash-qt` byte for byte.
- **Head moved:** after review, the PR head moved from `eb4929384856` to `496130ce0637`. That change only counts a repeated input once and accepts a dust remainder on a contribution without change; neither applies to this flow. The flow was rerun on that head, in `after-496130ce/`. The `after/` images are kept, labelled as the earlier head.
- **Head moved again:** after thepastaclaw's suggestion, the PR head moved from `496130ce0637` to `55672100f0b0`. That change makes the coins card on "Your contribution" describe the contribution Reserve will put back while the coins are released. The flow was rerun on it, in `after-55672100/`, adding a screenshot of that card (step 0). `after-496130ce/` and `after/` are kept, labelled as earlier heads.
- **Head moved again:** after two more review findings, the PR head moved from `55672100f0b0`, through `2a1bcc63da05`, which wasn't GUI-tested, to `01cda37af250`. That head only puts back a released contribution if Reserve built it itself in this dialog, so a contribution supplied in a reply is never restored. The flow was rerun on it, in `after-01cda37a/`. All earlier directories are kept and labelled.

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
| **After, current head `01cda37a`** | `2B5941` | `26fc12e2b4b1…:1` | `yje7Cz4simNygLgHp79wKaHPQjVH43UtjM` | `yje7Cz4simNygLgHp79wKaHPQjVH43UtjM` (same) |
| After, earlier head `55672100` | `203CD6` | `af751e84b326…:1` | `yZgBTrZreacVjojTzxQ8dn4Gaowr49sHS4` | `yZgBTrZreacVjojTzxQ8dn4Gaowr49sHS4` (same) |
| After, earlier head `496130ce` | `BADE7B` | `3956e6e857cb…:1` | `yLq2EbAc86fgRPp1mGDPRupet9Xa8JQfFe` | `yLq2EbAc86fgRPp1mGDPRupet9Xa8JQfFe` (same) |
| After, earlier head `eb492938` | `7B5A0D` | `5014c08cdec5…:1` | `yUmNLxUbmYxpwitYsEmac8Y58BjctHmDbP` | `yUmNLxUbmYxpwitYsEmac8Y58BjctHmDbP` (same) |

The change amount is 999.999 tDASH in every file.

## Pairs

| Step | Before: exact PR base | Before: rc.7 | **After: current PR head `01cda37a`** | After: earlier head `55672100` | After: earlier head `496130ce` | After: earlier head `eb492938` |
|---|---|---|---|---|---|---|
| 0. alice's coins card right after Release | [before-base/0-coins-card-after-release.png](before-base/0-coins-card-after-release.png) (session `98CC89`, a separate base run stopped at Release) | not captured | [after-01cda37a/0-coins-card-after-release.png](after-01cda37a/0-coins-card-after-release.png) | [after-55672100/0-coins-card-after-release.png](after-55672100/0-coins-card-after-release.png) | not captured | not captured |
| 1. alice's board after the re-reserve | [before-base/1-board-after-rereserve.png](before-base/1-board-after-rereserve.png) | [before-rc7/1-board-after-rereserve.png](before-rc7/1-board-after-rereserve.png) | [after-01cda37a/1-board-after-rereserve.png](after-01cda37a/1-board-after-rereserve.png) | [after-55672100/1-board-after-rereserve.png](after-55672100/1-board-after-rereserve.png) | [after-496130ce/1-board-after-rereserve.png](after-496130ce/1-board-after-rereserve.png) | [after/1-board-after-rereserve.png](after/1-board-after-rereserve.png) |
| 2. bob opens the locked terms | [before-base/2-bob-opens-locked-terms-refused.png](before-base/2-bob-opens-locked-terms-refused.png) | [before-rc7/2-bob-opens-locked-terms-refused.png](before-rc7/2-bob-opens-locked-terms-refused.png) | [after-01cda37a/2-bob-opens-locked-terms-approve.png](after-01cda37a/2-bob-opens-locked-terms-approve.png) | [after-55672100/2-bob-opens-locked-terms-approve.png](after-55672100/2-bob-opens-locked-terms-approve.png) | [after-496130ce/2-bob-opens-locked-terms-approve.png](after-496130ce/2-bob-opens-locked-terms-approve.png) | [after/2-bob-opens-locked-terms-approve.png](after/2-bob-opens-locked-terms-approve.png) |
| 3. registration | not run: the before runs stop at step 2 | not run | [after-01cda37a/3-alice-registered.png](after-01cda37a/3-alice-registered.png) | [after-55672100/3-alice-registered.png](after-55672100/3-alice-registered.png) | [after-496130ce/3-alice-registered.png](after-496130ce/3-alice-registered.png) | [after/3-alice-registered.png](after/3-alice-registered.png) |

**Step 1** looks the same on all three: "2 of 2 replied", "Received bob's Details", with no warning to ask anyone to reply again. That is the problem before the fix. The board gives the coordinator no sign that the re-reserve made bob's reply out of date.

**Step 2:**
- **Before** (both runs), bob gets the red "The locked terms do not contain the details you sent." and stays on "Waiting for alice".
- **After**, bob gets **Approve terms**, with "Received alice's Locked Terms · Code B0E9-DE2E" and Approve and Copy Reply enabled.

**Step 0:**
- **Base:** the card reads "Uses 1 coin (1 500 tDASH); change 999.999 tDASH returns to a new address of yours."
- **Current head `01cda37a`** (and the earlier `55672100`): "Uses 1 coin (1 500 tDASH) as reserved before; change 999.999 tDASH returns to the same address of yours."
- The head's card is scrolled a few pixels further down than the base's, but the Coins box is fully visible in both.

**Step 3, after only:** on the current head `01cda37a`, the ProRegTx `dcea870f2c13fb4bf90cb6043a081d23c42e3d857cc76b5cd7501f89fc98105d` confirmed. Its change output pays 999.999 tDASH to `yje7Cz4simNygLgHp79wKaHPQjVH43UtjM`, the change address in bob's Details, and no wallet held a lock afterwards. See [`after-01cda37a/registration-confirmed.txt`](after-01cda37a/registration-confirmed.txt). On the earlier head `55672100`, the ProRegTx `59ba8be9af03925a1cf1dcf03e54218b878402773d36f6d759ec6a3048fd5c95` confirmed. Its change output pays 999.999 tDASH to `yZgBTrZreacVjojTzxQ8dn4Gaowr49sHS4`, the change address in bob's Details, and no wallet held a lock afterwards. See [`after-55672100/registration-confirmed.txt`](after-55672100/registration-confirmed.txt). On the earlier head `496130ce`, the ProRegTx `2db9621d4dad65759b3b4e351dbd77dbbc00c8b35dc1e3eddba12376b97f7834` confirmed. Its change output pays 999.999 tDASH to `yLq2EbAc86fgRPp1mGDPRupet9Xa8JQfFe`, the change address in bob's Details. Neither wallet held a lock afterwards; see [`after-496130ce/registration-confirmed.txt`](after-496130ce/registration-confirmed.txt). On the earlier head, the ProRegTx `9199914641e3d87fc29d76aee2b897f65d7486d6d911930876db66b8ec99adf5` confirmed. Its change output pays 999.999 tDASH to `yUmNLxUbmYxpwitYsEmac8Y58BjctHmDbP`, the change address bob's Details listed. Afterwards neither wallet held a lock. See [`after/registration-confirmed.txt`](after/registration-confirmed.txt).

## Not shown

These are covered by the PR's unit test, `SharedMnWizardTests::reservingAgainKeepsEarlierReplies`, not by screenshots:
- the reply that lists another of this wallet's coins under alice's name, paying its change elsewhere;
- the fee-change fallback.

GUI checks on the earlier PR head `46de5fe1dea` (before review) also exist: the participant-side release and re-reserve, and a fee change after a reply. They're not published here, because they were taken on that earlier commit.

## About these images

- **Capture:** window crops (title bar included) of 902×768, from full-screen captures, with no scaling or annotation.
- **Content:** no operator secret key, "Save operator key" page or wallet dump is shown. All addresses and txids are regtest-only.
- **Hashes:** [`SHA256SUMS`](SHA256SUMS).
