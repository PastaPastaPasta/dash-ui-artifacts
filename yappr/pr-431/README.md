# Yappr PR431 — wait for shipping calculation

Exact base `4105c5d1c914f5d0838619da93c3b8d28b4a780e`; full head `a24b472ea27e81237775f7752010f0689bc25bb0`. Independently built production devnet exports at localhost:3211 and localhost:4190. Same assigned buyer41, store `98FYBhEF9Q8xNzbamzy66Dm5cMQ5gm9MoAZaiy518sNp`, product `25n2uxxtBSAWVWZBD86uGXdkHW7nYP25jpgfpPY87qRH`, quantity1 and synthetic US address shown. US shipping zone is already configured. Chromium1440×1200, en-US, America/Chicago, light; separate contexts and normal login/encryption-key entry.

Before: change postal code to60604 and promptly click Continue, then Skip on the save-address prompt. The pending lookup is treated as no matching shipping zone, so checkout rejects the accepted address. Identical untouched address succeeds after the request completes.

After: Continue is disabled and reads Calculating shipping... until the lookup finishes, then the same address advances to policies. Stale address calculations are ignored, and an old shipping rejection is cleared when the address or shipping selection changes. No network delay was injected and no responses, storage or application DOM were mocked.

| Before — exact base | After — full PR head |
| --- | --- |
| ![Premature shipping rejection detail](before/checkout-detail.png) | ![Pending shipping lookup detail](after/checkout-detail.png) |
| ![Premature rejection overview](before/premature-rejection.png) | ![Pending lookup overview](after/calculating-shipping.png) |

The same US address advances after calculation:

![Supported address accepted](after/accepted-us-address.png)

Additional actual UI checks: changing the country to unsupported Canada still rejects after the lookup settles; changing back to US clears the prior Canada rejection; turning off shipping clears the rejection and permits continuation. No order or payment submitted during these checks. Independent review, lint,145 unit tests and production devnet build passed. All5final screenshots were opened at original resolution and inspected. See EVIDENCE_MATRIX.md and SHA256SUMS.

## Superseded capture

This final-head comparison replaces the initial PR431 artifact at `cf2480fbfae4e36ab5dfd2bcf7c95357c320c89f`. Those after images predated the final stale-error fix, and the focused after frame retained a previous unsupported-Canada rejection from the compatibility check. Every after image above was recaptured from full final head `a24b472ea27e81237775f7752010f0689bc25bb0` in a fresh browser context and inspected; use this revision as the authoritative comparison.
