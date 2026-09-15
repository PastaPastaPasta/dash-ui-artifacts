# PR 410 capture matrix

Before product revision: `4105c5d1c914f5d0838619da93c3b8d28b4a780e` (exact staging base)
After product revision: `57d2395ae22566f79b355baaf5fad13dcf347c34` (full PR head)

| Surface | Shared fixture | Before | After |
| --- | --- | --- | --- |
| PaymentMethodModal, Select Type | Dash (Testnet), address `y123`, same actual product component; test-only onSave observer | Callback invoked once with `tdash:y123`; pending observer leaves invalid input visible | Callback not invoked; real inline validation message visible |
| PaymentMethodModal, Custom URI | `tdash:y123`, identical observer | Callback invoked once with malformed URI | Callback not invoked; real custom URI validation message visible |
| PaymentUriInput | `tdash:y123`, real component with local state setter | URI appears in actual component's accepted list | URI is not added; real validation message visible |

Each pair uses 1440 × 1100 Chromium, 1× scale, light theme, en-US, America/Chicago, a fresh signed-out browser context, and independently built production devnet exports. The same fixture source wraps product components on both revisions. It replaces only persistence callbacks, discloses the observer visibly, and never writes malformed payment destinations on chain. Screenshots are not representations of a completed real store save. Utility tests cover network/checksum/length validity and compatibility with URI query parameters; browser assertions also verify valid query parameters arrive unchanged at onSave/onChange.
