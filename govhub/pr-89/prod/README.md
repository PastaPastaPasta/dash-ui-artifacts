# govhub PR #89 on production

gov.dashhq.org after the deploy of `main` at `0622b25df297434e03364adb3a6ec694b35eb8f5` (pages run 45925264281, index
`assets/index-DYGArdHm.js`), captured 2026-11-27 ~02:00 UTC with headless Chromium against the live site. Desktop 1360x900;
phone 390x844 at 2x.

- `mainnet/`: the Mainnet profile (Platform protocol 14).
  - `proposals-*`: the active proposals list (mainnet read path).
  - `polls-list-*`: `/polls`, the waiting notice ("arrive with Dash Platform 5.1 on mainnet").
- `testnet/`: the Testnet profile (protocol 15), live testnet data.
  - `polls-list-*`: `/polls`, Open.
  - `detail-yesno-*`: `/polls/Bx4sgMPNXuZxZwnHa42sT7NKvzZsMpywSX9zDiYp69bK`.
  - `detail-multiple-choice-*`: `/polls/9TLMC1UoUWvC7kEYhDaGtwgXprQQffyx5Gqw654dfEVy`.
  - `names-*`: `/names` (username contests).
  - `vote-*`: the vote panel on the yes/no poll with masternode-13's voting key pasted (no account), Yes picked, not sent.
