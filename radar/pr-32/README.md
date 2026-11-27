# radar PR #32: fewer zone requests per cold page

- Head: `a4735a768b851c18727da46c1389abf890165577` (PastaPastaPasta/radar, branch `fix/explorer-request-burst`), built with `pnpm --filter @radar/web build` and served through the edge Worker (`review/serve.mjs`), reading live Radar, Platform Explorer, Hyphen and DAPI.
- The PR is not meant to change anything visible (chunking, request sharing/batching, service-worker precache). These show that the head renders the same pages correctly in light and dark, at desktop (1440×1000) and phone (390×844 @2x) widths.
- Pages: `/` (home), `/tx/b33c7fe3637e91aff1d06c68e656b1becd2ed23047c92a49b951f57269782f4e` (mainnet block 2,578,995), `/v24`.
