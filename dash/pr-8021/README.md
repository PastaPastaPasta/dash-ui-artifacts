# dashpay/dash#8021: a newer session copy that changes your own share is not loaded, before and after

PR: https://github.com/dashpay/dash/pull/8021

## Provenance

| | Commit | `dash-qt` sha256 |
|---|---|---|
| Before: PR base (`develop`) | `bf9a6cb3dc473dbbb6f72d69ea0bca25a5fd080b` | `65ac3f02617529461d2c512641419289cbbea9b0e851f9de9c6f4a69468e704f` |
| After: PR head | `936eeb0922e706e23964b5b11477c216a8a83c0e` | `7b2fe56672a99bfcc70d328251e61432130c7aa502b72050cbaa0898c8f1cd3e` |

- **Builds:** Linux x86_64 `--enable-debug` builds from depends, made in one clean detached worktree. The base was built at the base commit; the head is an incremental rebuild after checking out the head commit.
- **Miner:** the same base-build `dashd` (sha256 `bc3bd46f…0f0747`) in both runs. It only relays and mines regtest blocks.

## Fixture

- **Chain and wallets:** a throwaway regtest chain with v24 active, at height 629. Every amount and address is regtest-only.
  - The datadirs are copies of the shared-MN GUI QA thread's stream E. Their ports were changed, and one block was mined before either run.
- **Session `5F887E`:** alice coordinates; bob and carol participate.
  - **[`fixture/bob-session-rev40.json`](fixture/bob-session-rev40.json):** bob's session saved after he approved the locked terms (revision 40; alice 400, bob 300, carol 300).
  - Both of these were produced earlier in the real GUI by stream E's integration build, which contains this PR's change.
  - That build matters only for how the files were made: the files are the input for both runs.
- **The two newer copies bob is sent.** Both are revision 47 and both are locked terms:
  - **[`fixture/copy-own-share-changed-rev47.json`](fixture/copy-own-share-changed-rev47.json)** (Code `B5AB-5915`): bob 300→350 and carol 300→250. This was stream E's revised copy.
  - **[`fixture/copy-other-rows-changed-rev47.json`](fixture/copy-other-rows-changed-rev47.json)** (Code `9FAF-F813`): alice 400→450 and carol 300→250, with bob's row unchanged.
    - Made for this comparison in alice's real GUI on the PR-head binary: she reopened the revision 40 locked terms, chose Unlock terms…, edited the two amounts, and chose Lock and Approve. The file is what Copy Locked Terms put on the clipboard.
    - The coordinator code path that writes copies is not changed by this PR.
- **Each scenario starts from the same state:**
  1. bob's datadir is restored from one pristine copy;
  2. `dash-qt` is started on that run's binary;
  3. bob opens `bob-session-rev40.json` with Open File…;
  4. bob pastes one newer copy with the dialog's Paste button.
  - `0-start-approved-rev40.png` is pixel-identical in all four starts (two per binary).
  - Bob's wallet had 3 locked coins at the start of every scenario.

## Pairs

| Scenario | Before: exact base | After: PR head | What it shows |
|---|---|---|---|
| Starting state | [before/0-start-approved-rev40.png](before/0-start-approved-rev40.png) | [after/0-start-approved-rev40.png](after/0-start-approved-rev40.png) | bob on Approve terms: alice 400 / bob 300 / carol 300, 2 of 3 approved (bob's approval recorded), Code `AA34-9BB3`. |
| bob pastes the copy that changes his own share | [before/1-own-share-copy-loaded.png](before/1-own-share-copy-loaded.png) | [after/1-own-share-copy-refused.png](after/1-own-share-copy-refused.png) | **Before:** the copy replaces the session silently. bob's row now reads **350 tDASH**, his approval is cleared, Approve and Copy Reply is enabled, and nothing says his share changed. **After:** "This newer copy changes your share (bob), so it was not loaded. If you agreed to that change, close this window and open the copy again to review it. Otherwise ask alice to send a copy with your share unchanged." The session keeps Code `AA34-9BB3`, bob 300 and his approval. |
| bob pastes the copy that changes only other rows | [before/2-other-rows-copy-loaded.png](before/2-other-rows-copy-loaded.png) | [after/2-other-rows-copy-loaded.png](after/2-other-rows-copy-loaded.png) | Unchanged behaviour: both load the copy (Code `9FAF-F813`, alice 450 / bob 300 / carol 250, approvals cleared). The two images are pixel-identical. |

The images are window crops, title bar included, from 1920x1200 captures at original resolution with no scaling. No secret keys are shown.

## Not shown in screenshots

These are covered by `SharedMnWizardTests::newerRevisionKeepsOwnShare` instead:

- **Other own-share changes:** this GUI comparison changes bob's amount. The test covers newer copies that change the wallet's own refund, reward or owner address as well.
- **A newer unlocked draft:** a draft (not locked terms) that changes the wallet's own refund address.
- **Removed rows:** a copy that removes an earlier row still loads.
- **Coordinator role:** the coordinator-side wording ("ask whoever sent it") was not captured.

## File hashes

| File | sha256 |
|---|---|
| `before/0-start-approved-rev40.png` | `35ca7943c0f5b98a7154c4c458631ea69e652aafc3e6b31d5b8d178e097a42cc` |
| `before/1-own-share-copy-loaded.png` | `76a856cc70e69e8b5494cf0b3eaad205118bb1f52c6f6b442a260c6ea6cb43f5` |
| `before/2-other-rows-copy-loaded.png` | `cf4e9df3c21689876297a4258efb1045c1bfa7a0f54175fb32ac0b2ddf5c8733` |
| `after/0-start-approved-rev40.png` | `c19f5dd8f87a1d6838430dc2873659f879c15204b0177aa3f0b1013bc2831c4d` |
| `after/1-own-share-copy-refused.png` | `1f53c26f1950c53f96945445186bd9a5e6226a258880d231ee559a0a57735a5d` |
| `after/2-other-rows-copy-loaded.png` | `f8e87d9a7ae40402e329a213161c264d64ab76fecec642c9fdc09c868d5f3b1d` |
| `fixture/bob-session-rev40.json` | `10891f17cb8d7c8741925a0c89fee0c47791589f97672de214e835c1318fa560` |
| `fixture/copy-own-share-changed-rev47.json` | `5b9bacb0d1fcf4b7adedc397ca35389fd3a3a42ad0c3ee0e62f6135f656b4fe2` |
| `fixture/copy-other-rows-changed-rev47.json` | `dba7924dac6b463581c81f2f69cee729989074e52a05f5c66aa50bdd5291d626` |
