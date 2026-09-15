# Same-currency payment amount comparison

Base4105c5d1c914f5d0838619da93c3b8d28b4a780e, production devnet exportlocalhost:3211.
Head79e2d96eaabfbd1ad220bdd12e860401079714f7, independently built production devnet exportlocalhost:4191.
Same actual buyer41, same real store98FYBhEF9Q8xNzbamzy66Dm5cMQ5gm9MoAZaiy518sNp, product25n2uxxtBSAWVWZBD86uGXdkHW7nYP25jpgfpPY87qRH qty1, US shipping200duffs, product100duffs, total300duffs. Synthetic QA address60604. Same tdash:yebJ474guauJnZJ8JiC6zABRbANjgQsVNK test payment address. Separate contexts, normal supported login and encryption entry. Chromium1440×1200,en-US,America/Chicago,light.

| State | Before | After | Expected delta |
| --- | --- | --- | --- |
| DASH checkout via tdash payment | Amount not calculated / Price unavailable | Send:0.00000300 DASH | Same currency needs no exchange API |

No payment, wallet launch, or order submission in this comparison. Real devnet data, no mocked app DOM, storage or network responses. Read-only request observer records exchange-service requests during fixed payment step. Separate unit tests cover selfcurrency symbols, fiat conversion and unsupported schemes.
