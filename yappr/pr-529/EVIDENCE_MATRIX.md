# QA134 evidence matrix

| Surface | Before | After | Shared fixture | Expected change |
|---|---|---|---|---|
| Blank Add Product, click Product Title | cf0efbc10b8757137063113ebbd2061e8b87d8f7 | adfbab3e15872772f271cbb02e734faa0916f90b | Same merchant 62 store, empty form | Label click leaves input unfocused before and gives native focus ring after. Six visible labels gain field associations. |
| Existing simple product, click Product Title | Same exact base | Same full PR head | QA62 Amber Single, same saved values | Label click focuses the existing title after. |
| Existing variant product | Same exact base | Same full PR head | QA62 Cobalt Matrix, same axes and saved prices/stocks | Variant controls gain accessible names; visual appearance remains unchanged. |

Store: CP3dEXrdMEbbiFNHakoRkC86DonfVftuzUyaY4ngrnQb.
Amber: GWgJbLzxK5XfyNnVNdy7k8fyiBmUziSTSRQ5XtkExCWK.
Cobalt: 6D8xaKcFCkhaNdVELKvyWHCNrfMBSmoSmzjEMZu5sqFF.

Independent production devnet builds, same static-export mapping, About hashes verified. Fresh Chromium contexts restore the existing merchant auth snapshot privately at each local origin, retaining the helper's DPNS skip flag. No injected product, DOM, or network data. Light theme, en-US, America/Chicago, device scale 1, desktop 1440×1200, mobile 390×844. Only local draft changes and Back navigation; no Create/Save submission, upload, or Platform write. Final fresh readbacks confirm original products remain unchanged. Accessible names are verified through browser assertions and an ARIA snapshot, not fabricated visual differences. Shared image-upload controls are outside this PR.
