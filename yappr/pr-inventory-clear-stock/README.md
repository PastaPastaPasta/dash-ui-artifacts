# Persist cleared stock tracking — QA146

Exact base: `cf0efbc10b8757137063113ebbd2061e8b87d8f7`.
Full head: `026c7d22b1a2d67cda229c252276cf63cd86e176`.
Both independently built from committed source using the tracked devnet environment; separate local origins and disposable authenticated merchant62 contexts, 1280 × 900, light theme. Restored authentication is not login evidence.

Same disposable product `2j26J7FfWDtFDntxs9rPLgQ6rx1QNEGwHL35rKdigNSL`, QA117 Successful inventory, in store `CP3dEXrdMEbbiFNHakoRkC86DonfVftuzUyaY4ngrnQb`. Starting stock is reset to 7 before each scenario. Price 0.025 DASH, category QA Edited, description QA disposable edit persisted description. The catalog contains five products after the temporary pagination batch was removed.

| Action followed by fresh navigation | Before — exact base | After — full head |
|---|---|---|
| Clear the inline Inventory stock field, blur, wait for Unlimited, then load Inventory again | [Old stock 7 returns](before-inline-fresh-readback.png) | [Unlimited persists](after-inline-fresh-readback.png) |
| Clear Stock Quantity in Edit Product, Save Changes, then open Edit Product again | [Old stock 7 returns](before-editor-fresh-readback.png) | [Blank value with Unlimited placeholder persists](after-editor-fresh-readback.png) |

Both scenarios use actual devnet writes and fresh reads. The description, category and price are checked after the clear. The head additionally sets zero and confirms Out of stock in fresh Inventory. The disposable product is restored to stock 7 after testing. No payment or other product was changed.

The service previously omitted an explicitly undefined stockQuantity from its patch. The replacement layer already supports clearing optional fields using an explicit undefined value; forwarding property presence preserves that distinction without changing omitted-field behavior.

Three unit tests use the real service/replacement path with mocked SDK I/O and verify clear, omitted-field preservation, and explicit zero. The clear regression fails on the exact base; all three pass on the head. ESLint, full TypeScript, committed devnet build and independent review passed. Four final PNGs were opened at original resolution; no image edits or annotations.
