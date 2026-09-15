# Shipping lookup validation comparison

Base4105c5d1c914f5d0838619da93c3b8d28b4a780e, production devnet export localhost:3211.
Head680eac6869e8069d49a4b79126231fde36d1f32b, independently built production devnet export localhost:4190.
Same assigned buyer41, store98FYBhEF9Q8xNzbamzy66Dm5cMQ5gm9MoAZaiy518sNp, product25n2uxxtBSAWVWZBD86uGXdkHW7nYP25jpgfpPY87qRH qty1, same synthetic US address postal60604. Existing real shipping zone coversUS. Separate contexts, normal supported login; no storage/SDK/response mocking. Chromium1440×1200,en-US,America/Chicago,light.

| State | Before | After | Expected delta |
| --- | --- | --- | --- |
| Immediately after postal-code edit | Continue enabled; quick Continue/Skip shows cannot-ship error | Calculating shipping... disabled until matching result resolves | No premature rejection |
| Identical settled US address | eventually accepted | accepted after calculation | No change to shipping-zone matching |

Real devnet request timing. No order or payment submitted during this comparison. Actual initial reproduction completed twice before fix, including when encryption already present. Stale requests cancelled on address/cart/shipping changes.
