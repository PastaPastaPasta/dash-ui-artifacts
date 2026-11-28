# Dash Wallet Desktop restore evidence

Base build `2f230f1abd9736ca0c19a5844b9e098b2de65c16`. Candidate build `2cdbf123fbcfae8e0aece0079eaed0e11b1c8401`.

Both builds used the funded testnet fixture in Chromium at 1280 × 820. The wallet reopen capture starts with a cached empty restore status, then loads the wallet with a Platform restore hold and no intervening sync event. The recovery capture models the engine's response to a failed final directory sync. The base returns success and opens onboarding. The candidate returns the retryable I/O error and leaves the confirmation available for another attempt. The Rust regression injects the underlying sync failure.

| State | Base | Candidate |
| --- | --- | --- |
| Wallet reopened, light | [No Platform hold shown](before/wallet-reopen-light.png) | [Platform hold shown](after/wallet-reopen-light.png) |
| Wallet reopened, dark | [No Platform hold shown](before/wallet-reopen-dark.png) | [Platform hold shown](after/wallet-reopen-dark.png) |
| Recovery redirect sync failure, light | [Onboarding opens](before/recovery-sync-light.png) | [Confirmation shows an error](after/recovery-sync-light.png) |
| Recovery redirect sync failure, dark | [Onboarding opens](before/recovery-sync-dark.png) | [Confirmation shows an error](after/recovery-sync-dark.png) |
