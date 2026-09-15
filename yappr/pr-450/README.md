# Yappr PR 450 — Search older post history

Product: https://github.com/PastaPastaPasta/yappr/pull/450

Before: `4105c5d1c914f5d0838619da93c3b8d28b4a780e`, clean independent baseline build/server 3211. After: `c4bd6206a7f8ee2abca240032860c1ea1ddbf400`, independent production devnet build/server 4194, observed build stamp `c4bd6206`. Separate fresh Chromium guest contexts; 1440×1000, en-US, UTC, light theme. Live devnet timeline and ordinary UI interactions. No SDK, network response, storage, or DOM substitution.

Searching `masternode` finds no match among the first 100 English posts on both builds. The base declares no results and offers no continuation. The fixed build states the searched scope; one continuation reaches four older matching records after 200 scanned documents. A physical double click still advances only one page. Exact IDs: `CEzcAWEwXgDWRoB8zyim5MFd9kLAndEYWbVfPaGK5C7M`, `7d6rcf4FWCod2sX2MbRgLQmv8ARGPCNTYdCyGZrmhbNz`, `AE58MQrqmBMWDwfWWfhWBFfcKKD9oZtdBXcX41yfxf1R`, `7ueyYwTuPpS3pdAHBZx8Z5Xo3eg5VuSKAQ4ZtMZCBY9J`.

| Before — exact base | After — full PR head |
|---|---|
| ![Global-looking empty result](before-empty.png) | ![Honest partial result and continuation](after-initial.png) |

The older matching records become reachable after continuing:

![Four older matching posts](after-older-matches.png)

The blank author placeholders are a separately confirmed pre-existing Explore enrichment defect, tracked as QA-49. This PR changes search reachability and scope reporting.

A browser offline transport setting was enabled to test actual connectivity loss; no successful or failure response was forged. The next-page failure retained all four records and the cursor. Restoring browser connectivity and Retry reached 300 scanned posts and five matches.

![Retained results with retry](after-retry-error.png)

A separate first-page offline failure shows a failure state rather than a misleading empty result. The first retry after reconnect still failed transiently; a subsequent retry succeeded without discarding or duplicating data.

![Initial request failure](after-initial-error.png)

A no-match phrase was continued through the real entire English timeline. It ended after 6,492 documents and removed the continuation button. Counts are live and may grow after capture.

![Actual end of history](after-exhausted.png)

[Recorded IDs, cursor scope, and checks](observations.json). Query replacement during an in-flight continuation discarded older results, trimmed/repeated QA queries agreed, Unicode and punctuation queries remained stable, and clearing restored Explore tabs. Articles retain their existing separate discovery/search limits; this continuation is explicitly for English posts.

Validation: 148 unit tests, lint, final production devnet build, independent code review and simplification pass. Tests verify zero-match continuation, raw cursor progression past deleted/timestamp-tied records, short/empty exhaustion, and surfaced failures. All six final PNGs were opened and inspected at original resolution. No credentials are visible.
