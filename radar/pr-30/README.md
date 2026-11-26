# radar PR #30: pools that switched signalling mid-window

- before: base `3333936fd` (origin/main), local dev build of the unchanged tree
- after: PR head `9cad56d5`, same build setup
- Both use the same live mainnet `/api/v1/mainnet/activation` snapshot (tip 2,578,923), so the comparison is like-for-like. Pinned by Playwright route; every other source was live. The viewports are 1280×900 and 390×844 (2×), light and dark, UTC.
- synthetic-stopped: the same snapshot rewritten so F2Pool stops signalling at block 2,578,148 (the reverse case). Synthetic, not live.
