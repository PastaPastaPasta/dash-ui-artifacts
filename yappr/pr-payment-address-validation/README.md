# Yappr payment address validation

Before and after captures for PastaPastaPasta/yappr `fix/payment-address-validation`.

- **Before**: exact `origin/master` base (`f42ce65f`), temporary QA harness, entering `tdash:y123` and submitting saves the malformed URI.
- **After**: PR head after rebase onto `origin/staging` (`4105c5d`), same harness and input; submission is rejected with the visible `Enter a valid Dash testnet address (tdash:).` message.
- Shared fixture: 1280x900 Chromium viewport, Dash testnet modal, malformed address `y123`.
