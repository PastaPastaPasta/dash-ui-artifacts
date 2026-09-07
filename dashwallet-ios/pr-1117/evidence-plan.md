| Surface | Before | After | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Pay DashPay contact | 9e5c39a3480d4a9f0d706257c86ed72a2d935251 | fc66451c570d2259aab27cfd7dcb8577972ac7ac | Synthetic Alex contact; Transparent 0 DASH, Platform 0.00444 DASH, Shielded 57.03379 DASH; iPhone 16 Pro / iOS 26.5, dark, en-US | Before only offers zero Transparent funds; after shows all source balances |
| Shielded amount and confirmation | Not supported | Same head | Same contact/balances, 0.1 DASH typed | Contact name preserved from source to amount to withdrawal confirmation |
| Transparent compatibility | Existing amount sheet | Same amount sheet after source selection | Same contact and zero Transparent balance | Available 0 and Pay disabled remain correct |

Capture-only overlay presents production views with a synthetic contact and injects display balance publishers. No live contact request, note set, or payment is fabricated. The overlay is preserved as per-revision patches and is excluded from product commits. No live delivery claim is made. Journal durability and SDK reservation correctness are covered by automated tests.
