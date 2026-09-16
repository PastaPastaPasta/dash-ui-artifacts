# QA79 copied profile link
| Surface | Before | After | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Destination opened from actual copied profile link | 733faf53cd893cba861476a4af75b442ed67ca72 | full committed fix/profile-share-base-path hash recorded before capture | persona 55 Rosa Yamamoto, same browser light theme1280x720 and390x844; local production exports mounted /devnet | Before missing deployment path404; after same profile rendered |
Capture clipboard into safe JSON, open it directly in new tab without modifying URL. Show real destination; no injected clipboard overlay. URL JSON proves exact path; screenshots prove rendered destination. Fresh scoped identity helper is not login evidence. No profile writes. Inspect all final PNGs and verify public artifacts and rendered PR.

Final compared head: `a265c2630158f5d4f40c5441733aa03c3da217bf`.
