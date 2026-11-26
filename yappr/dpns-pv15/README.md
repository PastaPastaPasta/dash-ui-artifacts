# Yappr DPNS registration on protocol-15 testnet (2026-11-26)

Captured locally from production-shaped static builds (`npm run build`, root path), live Dash testnet (protocol 15, DPNS contract v3), Chromium 900x1100, typed-key session.

## staging/ — branch fix/dpns-pv15-name-hash-preorder, commit f49b3990 (base staging 25ccd19f)
Identity 3Ne8aGim8w6smCcVs7m14i5hT4ygPV2ZM5pWnqd363r9 (throwaway QA, testnet funds).
- 1-free-review.png: review of `yappr-pv15-769825` (not contested): network fees only.
- 3-free-complete.png: registered. Domain document 6UgskmoypzEJhi3B4KYdKAThNvgamscjVFkD35bv9wSg (no preorderSalt).
- 2-contested-review-deposit.png: `pvqwdfmfmk` (contested) quoted at a 0.1 DASH deposit. Stopped here; nothing was paid.

## master/ — branch fix/master-dpns-contest-cap, commit 284846e3 (base master 25ff8d4d)
Identity 4JHQ5Hc3mDuKybE4BSnRnxf5L1uzAEVidkXScE2SUYtM (throwaway QA, testnet funds).
- 1-free-review.png / 3-free-complete.png: `yapprpv15m296639` registered through the SDK's registerName. Domain document AA3S4PxiURU3971Gw6uX8LfwoYwsfnsaUdKq572JMWxv.
- 2-contested-review-deposit.png: `pvmjwcpmxd` (contested) with the new 0.1 DASH deposit line. Stopped here; nothing was paid.

No "before" captures: on the base revisions, staging's preorder is refused (saltedDomainHash is not a v3 field), and master shows no deposit (visible by its absence in the review).
