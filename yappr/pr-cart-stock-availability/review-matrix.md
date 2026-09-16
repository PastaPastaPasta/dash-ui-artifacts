# PR465 stock recovery evidence matrix

Primary stock regression comparison remains exact current target baseline c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0 versus final full PR head 4454c7922a2897da2e86b617013d4b644fa50509. Supplemental review iteration compares former full PR head 12fb4cce4cc0c1110a23492b33a3df3f36dc6fbe with that same final head; it is explicitly not a pre-PR base comparison.

| Surface | Before state | After state | Shared fixture | Expected delta |
| --- | --- | --- | --- | --- |
| Initial overstock cart and direct checkout | exact c98 baseline | final full head | Dedicated buyer52, cart 3 vs product stock 2 | Cart explains/blocks overstock; direct checkout retains cart and prevents payment progression |
| Quantity correction pending | previous PR head 12fb | final full head | Same cart 3→2, outgoing HTTPS reads delayed then continued unchanged | Whole-list spinner becomes mounted cart with refresh indicator and gated checkout/increase |
| Manual availability retry | previous PR head 12fb | final full head | Same invalid cart 3, unchanged delayed reads | Refresh is visibly pending and stale controls cannot submit/increase |
| Final availability failure | previous PR head 12fb | final full head | Same buyer, shipping/contact fixture, unbroadcast txid=64 ones, real browser offline mode before Place Order | Error-only replacement becomes inline alert with payment/reference/draft retained and in-place retry |
| Recovery | previous PR head 12fb | final full head | Reconnect same browser; no order/payment submitted | Retry restores enabled Place Order while preserving fields; separate-tab seller contact preserves active checkout |

Viewport 1440×1100 Chromium, light theme, same Node export adapter. No store/product/stock changes. Private auth storage never published. Shipping/contact placeholders are synthetic. Payment reference is intentionally unbroadcast and never submitted. Delayed reads are released unchanged; offline mode uses real browser network failure. No rendered UI or response payload is fabricated.
