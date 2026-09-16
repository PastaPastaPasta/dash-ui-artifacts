# Shipping and order status field labels — QA135

Base: `cf0efbc10b8757137063113ebbd2061e8b87d8f7` (staging).
Head: `d0033afc5e9be1c1b95ae723ff78c121f9ddbbc7`.
Each revision was independently built with the tracked devnet environment. Browser viewport 1280 × 900, light theme; disposable authenticated contexts using the same synthetic merchant. Restored session data is not login evidence.

Store: `CP3dEXrdMEbbiFNHakoRkC86DonfVftuzUyaY4ngrnQb`, QA Commerce62 Transition Lab, merchant `pE4KifoG3Jrvwkse3kng9vJ8wK1M2kBDC9FEeQgfRLC`.
Order: `7YghVjB5FZ4JwfvfQYNrFBrzPovM6tTVHyANKafcPFYX`, an unpaid synthetic buyer63 order. Its actual status is Cancelled. Shipped is only an unsaved draft to expose Carrier and Tracking Number; no shipping, payment, refund or status write occurred.

| Interaction | Before — exact base | After — full PR head |
|---|---|---|
| Click Weight Rate label | [Screenshot](before-shipping-label-focus.png): input stays unfocused | [Screenshot](after-shipping-label-focus.png): corresponding input has the blue focus ring |
| Click Message to Buyer label | [Screenshot](before-status-label-focus.png): textarea stays unfocused | [Screenshot](after-status-label-focus.png): corresponding textarea has the blue focus ring |

Before each label click, focus was placed on Cancel. All six shipping fields and all four status fields were exercised: each label failed to focus its field on the base and focused its field on the head. Head assertions also verify the exact accessible name of each control. The rendered screenshot pairs represent two of these ten associations; accessibility results for the others are in `before.json` and `after.json`.

The head's Worldwide toggle removes and restores the correctly associated Region field. Both forms were canceled. The fixture remained unchanged. Targeted ESLint, full TypeScript and the committed devnet production build passed. Four final PNGs were inspected at original resolution; no images were edited or annotated.
