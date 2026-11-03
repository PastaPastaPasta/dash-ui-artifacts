# dashpay/dash#8034 — before/after evidence

fix(qt): check a shared masternode's service and refund addresses before coins are reserved

- **Before** = `dash-qt`/`dashd` built from base `bf9a6cb3dc473dbbb6f72d69ea0bca25a5fd080b` (develop).
- **After** = built from PR head `c2e3bea0b07ed7fce538f1439dc25def289de793`.
- Same configure for both (`--enable-debug`, depends prefix). Every image is a real, live `dash-qt` window, not a rendered test.

Binary sha256:

```
base/dash-qt 9d9780b86e5be317e85b0f85c18c48d87231f316510ecaae10bfd0b9c40dcdfe
base/dashd fadc7c47e2baceb502a7b08f2ffc4a31d83487ffd2d667ed8a9be4fe5dd19fb8
head/dash-qt 50b6818edf357bf73a09b528e28fc7863dceeb923759e5f525db96e76cfb025e
head/dashd 6a3a13c097144a68879581f08826aaef6eec63fc4fcacfd6515f457bebd41683
```

## Fixture

- Regtest, v24/DIP3/v20 active, height ~620. One miner `dashd` and one `dash-qt` wallet ("alice", 1500 tDASH), from the same build under test.
- One regular masternode registered with `protx register_fund` at service `127.0.0.1:29535` (proTxHash `1121b22046ddbfdb06925c7bf1cbd4653938bf2b04676a7cebe9096c77dd030d`). See `context/registered-masternode-list.png`.
- Wizard: Masternodes → Shared Masternode… → Start a Shared Masternode, default two 500 tDASH participants, "Me" = row 1.
- All keys, addresses and coins are throwaway regtest data. No operator **secret** key is shown. The one "before" frame that reached the "Save operator key" page is cropped to its header (`-CROPPED`), and its uncropped original was deleted.

## Service address already in use (first commit)

| | Image | What it shows |
|---|---|---|
| before | `before/service-1-in-use-entered.png` | Settings page with `127.0.0.1:29535`, the registered masternode's service |
| before | `before/service-2-accepted-moved-to-exit-terms.png` | Next accepted it: the wizard moved on to step 3, Exit terms |
| after | `after/service-refused-on-settings.png` | Same input: red "127.0.0.1:29535 is already the service address of a registered masternode…", still step 2, Next disabled |

## Refund address equal to the owner address (second commit)

| | Image | What it shows |
|---|---|---|
| before | `before/refund-1-equals-owner.png` | Contribution page with Refund address = Owner address, Reward empty |
| before | `before/refund-2-accepted-coins-reserved-CROPPED.png` | Next accepted it and moved on to "Save operator key". `listlockunspent` showed 1 reserved coin |
| after | `after/refund-refused-on-next.png` | Same input: red "The refund address must differ from the voting address and every owner address.", Next disabled. 0 coins reserved |
| after | `after/refund-refused-on-reserve-coins.png` | "Reserve Coins" pressed with the same input: still refused, 0 coins reserved (`listlockunspent` empty) |

## File sha256

```
73a2658ad21ebb5631761862192ef925a45548f790ae3fc41b8cd5b2d5d03045  after/refund-refused-on-next.png
ab9c031f2f238b6b93976feb66fb90549df506e427e4cd0bf2ffe2d90f64c0df  after/refund-refused-on-reserve-coins.png
c724d7b08327efe465ba115f3e3bd940b70306062cde0416e3edbae27346baf7  after/service-refused-on-settings.png
6dec3428ff6e9554cc24d24a7996505f658991e3ecd22fe05268b152edf96b9b  before/refund-1-equals-owner.png
942f41ddc12b6c27a2d7166ea0ee1387a5b86029ef2c3123f21a483c711cb15f  before/refund-2-accepted-coins-reserved-CROPPED.png
6394519113c2a09f329ca358484ab184cfe7d848c791b9e443e8492e4fc68f1f  before/service-1-in-use-entered.png
1a9e0a34203172e2992758e13df7a9a478a6a904e5e71238c683feed5e5c1921  before/service-2-accepted-moved-to-exit-terms.png
58a7c4c67e2923b82de2fe925c843ec9af1ab03766dc828561bd0368eb49b3db  context/registered-masternode-list.png
```
