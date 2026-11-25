# yappr PR #984: return page through the wallet's callback tab (#947)

- Before: exact base `4437491a40afcbbfc3046d466a91d6a0711e970a` (staging), as deployed at https://yap.pr/staging/ by deploy.yml run for that sha.
- After: full PR head `ddb6b070ccf9d87c01a45dc8e026835d852cf602`, `npm run build` (testnet release set), served locally.
- Network: Dash testnet. Wallet: `mobile/tools/test-wallet-responder.mjs` with throwaway QA personas 90 (before, @qa-staging-5719a) and 91 (after, @qa-staging-5719b). Each request shown has since been answered and expired.
- Same script both sides, 1100x760 Chromium:
  1. open `/explore/` signed out, Sign in, Sign in with Dash Wallet (1-start-tab-qr)
  2. close that tab; the wallet answers the request
  3. open the wallet's return link `/connect/?r=<request hash>&ac=ok` in a new tab (2-callback-connect)
  4. no tab answers: before goes to `/login/`, after to `/login/?request=<hash>` (3-callback-login)
  5. Sign in with Dash Wallet, Continue as … (4-callback-confirm)
  6. final page (5-after-sign-in): before `/feed/` (Home), after `/explore/`
