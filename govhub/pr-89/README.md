# govhub PR #89: masternode polls

Captured from the PR head `a2d2c73326127ab2f20587955e1c4565e0add34f` (branch `feat/masternode-polls`), served by `vite` dev,
headless Chromium. Desktop 1360x900; phone 390x844 at 2x.

- `testnet/`: the Testnet profile, live testnet Platform data (2026-11-27 ~01:10 UTC).
  - `list-*`: `/polls`, Open.
  - `detail-yesno-*`: `/polls/Bx4sgMPNXuZxZwnHa42sT7NKvzZsMpywSX9zDiYp69bK` (yes/no; masternode-12 voted yes, masternode-13 no).
  - `detail-multiple-choice-*`: `/polls/9TLMC1UoUWvC7kEYhDaGtwgXprQQffyx5Gqw654dfEVy` (created from the app; Green and None of the choices voted).
  - `vote-*`: the vote panel on the yes/no poll with masternode-13's voting key pasted (no account), Yes picked, before sending.
- `mainnet/waiting-*`: `/polls` on the Mainnet profile, which is still on protocol 14: the waiting notice.

`SHA256SUMS` holds the hashes of these files.
