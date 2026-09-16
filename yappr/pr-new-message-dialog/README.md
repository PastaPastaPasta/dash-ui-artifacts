# New Message dialog accessibility (QA-61)

Exact base `eb895be71a7207c73fb9329ac9d9bb7b398f53da`; exact head `e8555303` (full SHA in PR). Shared persona55 and existing conversation fixture, fresh sessions, Chromium.

Before captures show the hand-rolled overlay: no dialog role, Tab escapes to the page, and Escape leaves it open. After captures show Radix dialog semantics, a named Close button and recipient textbox, trapped forward/reverse Tab, Escape close, focus return, state clearing, username search and identity selection, including mobile focus fallback. All final PNGs inspected at original resolution; hashes are in each side's SHA256SUMS.
