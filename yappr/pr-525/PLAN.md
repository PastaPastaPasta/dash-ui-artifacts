# PR 525 revised evidence plan

| Surface | Before | After | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Blog dashboard tabs at 320, 390, 1280px | Exact base cf0efbc10b8757137063113ebbd2061e8b87d8f7 | Committed PR head, recorded in README | Synthetic Layout demo blog with 11 articles, same public owner/blog IDs as previous fixture, Theme selected; light theme; 900px height | Equal tab widths fill the entire content row, normal 14px labels, no overflow |

Check widths 320, 360, 375, 390, 430, 639, 640, 768, 1024, 1280. Check native keyboard focus and activation at 320, 390, 1280. Matching synthetic blog and article service reads in disposable browser sessions; no source or CSS overrides and no data writes. Live devnet reads failed, so this does not establish backend or login coverage. Original committed independent base build on port3288; committed head build on a separate port. Inspect all six original images before publication. Replace the old PR evidence and description because the earlier 360px-only implementation is superseded.
