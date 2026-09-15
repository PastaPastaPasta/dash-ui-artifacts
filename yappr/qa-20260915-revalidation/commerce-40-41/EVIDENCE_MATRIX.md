# Normal commerce lifecycle QA

Exact staging baseline `4105c5d1c914f5d0838619da93c3b8d28b4a780e`, production devnet export at localhost:3211, real devnet data.

Assigned seller persona40: kalindam81 / 5Qazb9Ncc7LgLSSWkPj36Qpp5ZpEoQEcHNR2Ync7cJcK.
Assigned buyer persona41: selfhostotis8 / 5NW5MP2yVzqGavBCZtpfJ72CcGhiN2vX7RsdtJpQhhda.
Only these assigned test identities may be changed. All products/stores/orders explicitly QA-labeled. Test balances only.

| Story | Expected evidence |
| --- | --- |
| Create store and configure payment/shipping | Actual normal forms; persisted store route and fresh readback |
| Add product and update inventory | Product form, stock control and readback |
| Cart quantity/removal/reload | Exact product and quantities before/after interactions |
| Shipping/checkout | Actual address fields using synthetic QA address, normal prerequisite prompts |
| Order/fulfillment/review | Real order IDs, buyer/seller status changes and fresh readbacks; blockers reported as such |

Chromium, 1440×1200, en-US, America/Chicago. No auth bypass or storage injection. Private keys entered through normal supported UI; never shown or logged. Capture exact UI errors without reconstructing product DOM.
