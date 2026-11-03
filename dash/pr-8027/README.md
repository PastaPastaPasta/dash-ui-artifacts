# dashpay/dash#8027: Update Service fee source for a shared masternode, before and after

PR: https://github.com/dashpay/dash/pull/8027

## Provenance

| | Commit | `dash-qt` sha256 |
|---|---|---|
| Before: exact base (`develop`) | `bf9a6cb3dc473dbbb6f72d69ea0bca25a5fd080b` | `da88a85f6b7fc9c2ef98dd86eae13d72b5391a8550f767f3e287997ce737b246` |
| After: PR head | `eddc5855c3d4286ec7bcd487cd4118e985dfc5a0` | `376ddebe1b60f8a17ec2a2bbef4fd29d89052d90009e7512390a08ac605d75df` |

Both are Linux x86_64 `--enable-debug` builds from depends. The "after" `dash-qt` was built from the clean tree at the PR head commit. The miner and masternode `dashd` came from the base build in both runs; they only mine blocks and serve the masternode, so they don't affect what these screenshots show.

## Fixture

- **Chain:** a throwaway regtest chain with v24 active, at height ~624. All data is regtest-only.
- **Masternode:** shared masternode `8a72d3b41ef6b17ed4cb172043ab816c48ecb595d5b4326353aca29d1cb231c4`, registered over RPC (`protx shared_register_prepare` → `shared_sign` → `shared_combine`), service `127.0.0.1:29505`, no operator reward. Two shares of 500 DASH:
  - share 1: alice's wallet, reward address `yicS9guGB6hfGMo69BdobBvJdaoWQ8tw5m`;
  - share 2: bob's wallet, reward address `yPvvjdDNApr8rgiCcbhpEK2pKZT9QHXTg8`.
- **Masternode node:** a `dashd` run with the operator key, status READY.
- **Wallet under test:** bob (holds share 2, **not** share 1), 1 200 DASH in one coin at `yhEzaTG2qjkvfd7Ki2tYCeFLg9aEJygqwB`. Bob's `dash-qt` was restarted on each binary with the same datadir.
- **Steps, both runs:** Masternodes tab → right-click the masternode → **Update Service…** → leave every prefilled value and the default Fee source → type the operator secret key (masked) → **Send Update**.

## Pairs

| Scenario | Before: exact base | After: PR head | What it shows |
|---|---|---|---|
| Dialog as opened | [before/1-update-service-automatic.png](before/1-update-service-automatic.png) | [after/1-update-service-own-address.png](after/1-update-service-own-address.png) | **Before:** Fee source defaults to "Automatic (recommended)". **After:** it defaults to bob's own funded address `yhEzaTG2…JygqwB (1 200 tDASH)`, and the hint reads "The fee is paid from this address of your wallet." |
| Result of Send Update | [before/2-funding-error.png](before/2-funding-error.png) | [after/2-key-entered.png](after/2-key-entered.png) → [after/3-sent.png](after/3-sent.png) | **Before:** "The transaction could not be funded: No funds at specified address yicS9guGB6hfGMo69BdobBvJdaoWQ8tw5m", which is alice's share-1 reward address; nothing reached the mempool. **After:** "The transaction was sent successfully", txid `01c80dcd3c51fdacba25106ce2adff7512190988370504d5677e4b7b4bbe014a`, a ProUpServTx (type 2) whose only output (change) goes back to `yhEzaTG2…JygqwB`. It was mined in the next block. |

The images are window crops (title bar included) from full-screen 1920x1200 captures at original resolution, with no scaling. No secret keys are shown; the operator key field is masked or empty.

## File hashes

| File | sha256 |
|---|---|
| `before/1-update-service-automatic.png` | `bd00a3aecdbfc9fd5b62dde69a4606390d58e5cfa8f55ff5181835e5e8d963f8` |
| `before/2-funding-error.png` | `151c0d8a0035f9e7e5f9a285ca34e8b07cd941da79d8f3929a09128688356700` |
| `after/1-update-service-own-address.png` | `029b3c4e0c26b1f2c1c0e98b14dc1527ed4787468e0c18807fc029b4fb1ce5cc` |
| `after/2-key-entered.png` | `0a7ab5f0e3367e8ac849ba7f364ca1d81593b2f70a4331794cfdc80ccc541ec9` |
| `after/3-sent.png` | `05d0d8c97b53aa1d13fab708b82bbd127ff2b294b22b98c2d1ef1c275679be1c` |
