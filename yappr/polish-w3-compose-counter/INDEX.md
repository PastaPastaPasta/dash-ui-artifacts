# W3 compose character counter: visual evidence

- Before: base `d15bea35` (staging). After: head `f9a5a850`.
- Both were rendered with the repo's component fixture (`e2e/components-qa-round1`, `qa-round1.html?fixture=composer`), which renders the same `ThreadPostEditor` that compose, reply and quote use. The page was 640px wide with full-page captures.

| File | Draft |
|---|---|
| counter-short | 20 characters. Before: "20 / 1000". After: no counter. |
| counter-near | 920 characters. After: a ring with 80 left, in brand colour. |
| counter-last20 | 990 characters. After: a ring with 10 left, in amber. |
| counter-at-limit | 1000 characters. After: 0 left, in amber. |
| counter-too-long | An oversized draft. After: a red ring and "Too long". |
