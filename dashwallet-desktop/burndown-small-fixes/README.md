# Dash Wallet Desktop restore evidence

Base build `fca6fa6b12f5e38b7c84b8d9e422972a213467cd`. Candidate build `7ca5a3075aa154cde3028ebabcb35986e32bfc60`.

Both builds used the funded testnet fixture in Chromium at 1280 × 820. The wallet reopen capture starts with a cached empty restore status, then loads the wallet with a Platform restore hold and no intervening sync event. The recovery capture models the engine's response to a failed final directory sync. The base returns success and opens onboarding. The candidate returns the retryable I/O error and leaves the confirmation available for another attempt. The Rust regression injects the underlying sync failure.

| State | Base | Candidate |
| --- | --- | --- |
| Wallet reopened, light | [No Platform hold shown](before/wallet-reopen-light.png) | [Platform hold shown](after/wallet-reopen-light.png) |
| Wallet reopened, dark | [No Platform hold shown](before/wallet-reopen-dark.png) | [Platform hold shown](after/wallet-reopen-dark.png) |
| Recovery redirect sync failure, light | [Onboarding opens](before/recovery-sync-light.png) | [Confirmation shows an error](after/recovery-sync-light.png) |
| Recovery redirect sync failure, dark | [Onboarding opens](before/recovery-sync-dark.png) | [Confirmation shows an error](after/recovery-sync-dark.png) |
