# dashpay/dash#8036: a shared masternode participant follows a revised invitation that keeps their share, before and after

PR: https://github.com/dashpay/dash/pull/8036 (stacked on #8021)

## Provenance

| | Commit | `dash-qt` sha256 |
|---|---|---|
| Before: the base this PR stacks on (#8021 head) | `936eeb0922e706e23964b5b11477c216a8a83c0e` | `ab0641c32366108acf7debb5a39018a31d663738cb67e9388c3aa360ba4cc189` |
| After: PR head | `1a80ce0ff1e2093a1a906a0d25a181c2ed1a36ad` | `88de7b7ab49e17b5c6fcb610afa7cdbaa8aaa4e414efadf2e66500d4b5f7a740` |

Both are Linux x86_64 `--enable-debug --enable-werror` builds from depends, made from the exact trees of those commits. The miner `dashd` (sha256 `41e2978d…c2052482`) is the same in both runs. It only mines regtest blocks and contains no Qt code.

## Fixture

- **Chain:** a throwaway regtest chain with v24 active, at height 621. All data is regtest-only.
- **Session `DFF131`**, built in the real GUI by alice (coordinator) and bob (participant). These invitation files are the shared input for both runs:
  - `inv1`: alice 400 / bob 300 / carol 300, revision 26.
  - bob sent Details Code `7D85-E169` (revision 27, one coin reserved), and alice absorbed them.
  - **Carol-only revision** (revision 36, Code `161A-4CBD`): alice renamed carol to "carol (renamed)". Bob's row and contribution are untouched. Alice's Invite page then says "Participants who already replied must reply again."
  - **Own-amount revision** (revision 42, Code `E6EC-67BE`): alice then changed bob 300→350 and carol 300→250.
  - Alice ran an earlier build of this branch while she produced these files. The coordinator code path that wrote them is #8021's, and this PR doesn't change it.
- **Each run:** bob's `dash-qt` is started on that run's binary with the same datadir, where his coin is still reserved.
  - He reopens his session file saved right after sending Details `7D85-E169`, and sends the same Details again. That puts him on "Waiting for alice" (image 0).
  - He opens each revision with **Open File…**.
  - In the after run, alice (on the PR-head binary) reopens the carol-only revision and pastes bob's new reply.
- Bob's wallet had exactly 1 locked coin (`listlockunspent`) after every step of both runs.

## Pairs

| Scenario | Before: #8021 head | After: PR head | What it shows |
|---|---|---|---|
| Starting state | [before/0-details-sent.png](before/0-details-sent.png) | [after/0-details-sent.png](after/0-details-sent.png) | bob on "Waiting for alice", You sent: Details · Code `7D85-E169`. |
| Bob opens the carol-only revision | [before/1-carol-only-revision-refused.png](before/1-carol-only-revision-refused.png) | [after/1-carol-only-revision-loads.png](after/1-carol-only-revision-loads.png) | **Before:** the coordinator-worded refusal, "The reply does not match your current draft… Ask the sender to paste your latest invitation and reply again.", although bob's share is unchanged. **After:** it loads on Your share, bob's own owner and refund addresses (`yS25st…YFLws` / `yZiiVM…ZU5ou`) and reservation are kept, and the status reads "Loaded the newer invitation; your share is unchanged. Review it, then send your details again." |
| Bob replies again | — | [after/2-replied-again.png](after/2-replied-again.png) | **Reserve Coins and Copy Details** sends Details `161A-4CBD`. The copied reply's bob row and bob contribution are byte-identical to the first reply's (checked from the clipboard). |
| The coordinator absorbs it | — | [after/4-coordinator-accepts-reply.png](after/4-coordinator-accepts-reply.png) | alice: "Received Details · Code 161A-4CBD", no error, bob ✓ Details ✓ Funded. |
| Bob opens the own-amount revision | [before/2-own-amount-revision-refused-generic.png](before/2-own-amount-revision-refused-generic.png) | [after/3-own-amount-revision-refused-names-share.png](after/3-own-amount-revision-refused-names-share.png) | **Before:** the same generic coordinator-worded refusal. **After:** "This newer invitation changes your share (bob), so it was not loaded. If you agreed to that change, close this window and open the new invitation to review it. Otherwise ask alice to send an invitation with your share unchanged." Bob stays on the waiting page with his reply and reservation. |

The images are window crops (title bar included) from full-screen 1920x1200 captures at original resolution, with no scaling. No secret keys are shown.

## File hashes

| File | sha256 |
|---|---|
| `before/0-details-sent.png` | `831a877aba2d87f6ffa185679bd29d41a8a8969c386c252391094572a0606b95` |
| `before/1-carol-only-revision-refused.png` | `2339403de9566cad7734257db29b0a478e0596df458bd096995fb88356dbcbc5` |
| `before/2-own-amount-revision-refused-generic.png` | `1ba04a07fe3ced8b90884f832e53c5e1ad3fb08bf8e7a4155c310c735eace63b` |
| `after/0-details-sent.png` | `4f82e07ccd7a3455cad5ed70dc9695bb3b9f26e0125bd4b5dcaec52b2b3a85ba` |
| `after/1-carol-only-revision-loads.png` | `9021d9cfc80c96d7a83395cb54eeb6e6c51c62a690c3cf5055024d4fa976867b` |
| `after/2-replied-again.png` | `c586248a31536cbb4db8a47d2a8890487b7aecb19f35d6a9a8d5f54f3b1df41f` |
| `after/3-own-amount-revision-refused-names-share.png` | `f3e32d0adb1a4b4c9dd458576500b0dcd6b1174370ab17e404d8d733a7c3b755` |
| `after/4-coordinator-accepts-reply.png` | `55bb184f3849e9dea86b6bece424b9bedff3127abbbf4956afc2a594e670be6c` |
