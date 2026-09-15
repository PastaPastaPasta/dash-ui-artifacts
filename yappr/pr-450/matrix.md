# Evidence matrix

| Behavior | Before | After | Shared fixture | Expected delta |
|---|---|---|---|---|
| Search masternode | exact staging4105c5d1c914f5d0838619da93c3b8d28b4a780e, independent3211 | final signed head to record, independent4194 | same real English devnet timeline and term, fresh guest contexts1440x1000,en-US,UTC,light | base has false global empty; head declares100 searched and offers continuation; older matching posts become reachable |
| Query with no matches to end | same base | same final head | unique ordinary QA phrase, no new writes | head progresses across no-match pages and reports end, no continuation left |
| Repeated/trimmed/rapid query changes | same base | same final head | ordinary masternode / QA / Unicode phrases | matches correspond to latest normalized query |

All testing uses supported UI and live network, no mocked data or application state. Exact older match IDs and scanned counts accompany screenshots.
