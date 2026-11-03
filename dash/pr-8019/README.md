# dash#8019 — shared masternode broadcast refused by the mempool: before/after evidence

All screenshots are real captures of `dash-qt` on a disposable **regtest** network with throwaway wallets (`alice`, `bob`, `carol`). No mock widgets, no mainnet or testnet funds. Operator secret keys never appear.

## Builds

| Column | Source | `dash-qt` sha256 |
|---|---|---|
| **Before — exact base** | `dashpay/dash` develop `c85c345bc21f9bf6268ad3ef3eae29ac055ed04b` | `3332084cfb40c2399421a6ecafefcb2dfd66eeb7ccab13639bf97e46fac20595` |
| **After — PR head** (standby screenshots) | `e05da58e46b74ee8033f4d0d58a144cdeea71c02` | `53994574adb1236f1d01f171aefe6172eaf3bfc75a15c7c411b50236035fb3db` |
| **After — earlier PR head** (registration screenshots) | `0a924cd5faa7ae11e7fa5314b8c2dc5c20737600` | `9d1e3f956a75f9a28862db2129d28db7d41c59701f454f181328398c0c7cb1c6` |
| Released rc.6 (supplementary) | official `dashcore-24.0.0-rc.6-x86_64-linux-gnu.tar.gz` (sha256 `610e376501f742d597b9182e146a91e51b6aba57c94cd6e6c0644affc8655ce5`, signature verified) | `adc101dd6342af36160362b559037af615ad9e547208db0cd00808a4c9d41df2` |

Both base and head were built from the same worktree, in the same configuration. The base build is the head with its two product files (`src/qt/sharedmnwidgets.cpp`, `src/qt/masternodeoperationrunner.cpp`) checked out at the base commit, so its product sources are identical to the base. Both report `/Dash Core:24.1.0/`.

The current head `e05da58e` differs from `0a924cd5` only in the wording of the `bad-prodis-penalty-floor` explanation and in the test. The registration case never shows that explanation (it is refused with `bad-txns-inputs-missingorspent`), so its `0a924cd5` screenshots still show the current head's behaviour. The standby "after" screenshots were recaptured with `e05da58e` from a fresh copy of the same datadir, at the same height. That copy showed the wallet-sync overlay because the regtest tip was older by then, and it was hidden before pasting.

## Shared fixture

- One regtest chain. Shared masternode #1 (proTx `93febf9d…cbfa1209`) is registered at height 622, with a 50-block early period and a 50 tDASH early-exit penalty.
- Each case was run twice, from **two copies of the same stopped datadir**, one copy per build. The copies started at the same height (628) with the same wallet state and the same coin reservation.

### 1. Standby dissolution pasted inside the early period (`comparison/*/standby-*`)

- **Who:** share 2 (`bob`).
- **What:** pastes the "full principal" standby dissolution for MN #1, txid `4a1d4735e01318a4e00cb56c480807abafe1599389d92d1a91955855cbdae245`, into *Masternodes → Shared Masternode… → Paste From Clipboard*, then answers *Yes*.
- **Network verdict:** the node refuses it, `bad-prodis-penalty-floor`. The full-principal dissolution is only valid from height 672.
- **Results:**
  - **Before:** "Standby dissolution sent" plus the txid. Bob's and the miner's mempools are empty (`standby-before-state.txt`).
  - **After:** "Broadcast failed", the explanation, and `Network rejection: bad-prodis-penalty-floor`. Mempools are empty (`standby-after-state.txt`).
  - **Released rc.6** (`rc6/standby-2-result-full.png`, height 625): the same false "Standby dissolution sent" for the same txid.
- The confirmation box before *Yes* is identical in both builds (`standby-1-confirm.png`).

### 2. Registration whose funding input was spent after signing (`comparison/*/registration-*`)

**Setup:**
- A second three-party session (D41C0A, 400/300/300 tDASH).
- It was taken to "3 of 3 funding inputs are signed". The coordinator (`alice`) saved it to a file.
- Carol then spent her reserved input `9a4e0759…e266:1` in an ordinary transaction, mined at height 628.
- Alice's wallet does not track that coin, so the dialog cannot catch the conflict in advance.

**Run:** each build opens the **same saved session file** in its own copy of alice's datadir, then *Broadcast Registration → Send*.

**Start state:** pixel-identical in both builds (`registration-1-signatures.png`). The confirmation is identical too (`registration-2-confirm.png`), including "1 funding input cannot be value-checked on this node yet".

**Before** (`reg-before-state.txt`):
- The dialog shows "Shared masternode registered" with proTx `ce9e9413…c20db` and offers "Copy Final Record".
- In reality the transaction is in no mempool or block (`getrawtransaction`: not found).
- No second masternode exists.
- Alice's coin reservation was **released** (`listlockunspent`: 0).

**After** (`reg-after-state.txt`):
- The dialog stays on **Signatures**: 3 of 3 signed, *Broadcast Registration* still enabled for a retry.
- It shows "Broadcast failed: Inputs missing or spent" and "Network rejection: bad-txns-inputs-missingorspent".
- Alice's coin stays **reserved** (`listlockunspent`: 1).
- Nothing is in any mempool.

## Files (sha256)

```
881b912790b91435eebb3c1d62d40fe2935702598bb5a026b13203d7c1e4ae7e  ./comparison/after/registration-1-signatures-full.png
5427c9e16d0c0c495a4bcc83448a3e2bb64f5ae2df0665347fe50113eb95ee0d  ./comparison/after/registration-1-signatures.png
7ddd94df196981c73b35887ce855e6e06b2e737f34d12c4a77e2350eaa0e9741  ./comparison/after/registration-2-confirm.png
eb7390214901d4cfaa0b4fb436168245565245a79e47c379b27c72b8de995912  ./comparison/after/registration-3-result-full.png
0edb05c1f9fcc0232b0d69f1cd3771dc525de18940740fd8fb5b49a10cbe6a01  ./comparison/after/registration-3-result.png
9d1c333d260a57bd18fd0d1a562b3846aa99cc1250f4ef810c4cf0201f4d2429  ./comparison/after/standby-1-confirm.png
c696212b3d96a6d972d5dd6d34d05eb877883f87bccb83021c54221c37c32561  ./comparison/after/standby-2-result-full.png
254f51071011bcc862db023dfe495aaaf894eaa278b27c9b709378c726bc70a9  ./comparison/after/standby-2-result.png
881b912790b91435eebb3c1d62d40fe2935702598bb5a026b13203d7c1e4ae7e  ./comparison/before/registration-1-signatures-full.png
5427c9e16d0c0c495a4bcc83448a3e2bb64f5ae2df0665347fe50113eb95ee0d  ./comparison/before/registration-1-signatures.png
11d367e2a032820d36482a2ccc3000fff01583e9e0161810bc8cdecfe74ba5bb  ./comparison/before/registration-2-confirm.png
15321cc29e49f73c745fe6e05f2d4c82efd2931cbeb61172b3654bd7ed67603c  ./comparison/before/registration-3-result-full.png
c9fe8d43a464ad57e2624e4e32bd68f32b93b0801789188fe319d6e7cec89fd4  ./comparison/before/registration-3-result.png
24dbe9f9ae91c090217b5b39547885f8289cdc037c9fff9da5bae3910c25cc89  ./comparison/before/standby-1-confirm.png
29f45abadf606cbe06d10c35a9a592647dbe3049093fde52f7a2b5432f5ac281  ./comparison/before/standby-2-result-full.png
b94109b4267f7bb5d074617dd349a1cee62f0d74d0052513d9fec13d991000c1  ./comparison/before/standby-2-result.png
a99bc1263e67a664f58dbbe311de356c66b057d1e875250d4dcc9d4615d9d120  ./rc6/standby-2-result-full.png
c651de8455444957b20f14ddc4bdbba67806f5e4a29f336c394a7ce399455808  ./reg-after-state.txt
dcc161dbb0571c2ce387f9c0e4c7abd9f6bb6470087210a53acccf2a3400e935  ./reg-before-state.txt
8345de679fe9b2d96c24ec57b0f30fb426eaa2723d639b63203dabad0609eb87  ./standby-after-state.txt
864ec7eb9b7ab7a362285486b18df1a6612a804c4a217d479fc0ce3e519864f5  ./standby-before-state.txt
```
