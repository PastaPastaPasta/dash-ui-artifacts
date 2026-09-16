| Surface | Before | After | Shared fixture | Expected visible change |
| --- | --- | --- | --- | --- |
| Seller payment method selector and address hint | c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0:3260 | Full isolated head:3282 | Persona51 closed store, unsubmitted new-method dialog | Testnet labels/hints become Devnet |
| Invalid address feedback in both modes | same | same | y123 / tdash:y123; never valid for save | Local validation says devnet; no semantics or data changes |
| Checkout payment QR header/icon | same | same | Existing persona52 cart, store40 product 6mp5PmmL7vU792PGEHC84VNy632gcFDo47c9qMpErD3E, quantity1 | Testnet/tD becomes Devnet/dD |
| Coin note and other deployment networks | same | same | Network mapping tests and any available actual amount display | Note follows same watcher network; mainnet/testnet unchanged |
