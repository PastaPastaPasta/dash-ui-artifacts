# Dash Wallet Desktop PR 1079

- Before build `eebb848bd12b8a7e6fb56aef3b281a852fb880fc`.
- After build `1acf48c3b6e13fabb678da2e41617325ecef5164`.
- Chromium in the repository's pinned Playwright image, at 1280 × 820 and 1× scale, in light and dark.
- The testnet fixture reproduces the engine regression's 12 one-DASH coins, a 0.50 DASH debit, and the same single held input. The captures illustrate the resulting renderer states. Rust tests drive the reorg through key-wallet.
- Overflow shows how the same hold appears when the original lock was evicted. The row reads Pending.
- Home shows the Core balance. Activity shows whether the example payment and its InstantSend badge are present. Details opens the retained payment at the after revision. Pay shows both the Max amount and whether the labeled input can be selected.

[Dash Wallet Desktop PR 1079](https://github.com/PastaPastaPasta/dashwallet-desktop/pull/1079)
