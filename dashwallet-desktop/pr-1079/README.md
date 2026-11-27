# Dash Wallet Desktop PR 1079

- Before build `a518432bd0121817ecd16b8c22264034f5a818ae`.
- After build `cc85592d8996b5f2c1aa0029bb0af8d69704c9e2`.
- Chromium in the repository's pinned Playwright image, at 1280 × 820 and 1× scale, in light and dark.
- The testnet fixture reproduces the engine regression's 12 one-DASH coins, a 0.50 DASH debit, and the same single held input. The captures illustrate the resulting renderer states. Rust tests drive the reorg through key-wallet.
- Home shows the Core balance. Activity shows whether the example payment and its InstantSend badge are present. Details opens the retained payment at the after revision. Pay shows both the Max amount and whether the labeled input can be selected.

[Dash Wallet Desktop PR 1079](https://github.com/PastaPastaPasta/dashwallet-desktop/pull/1079)
