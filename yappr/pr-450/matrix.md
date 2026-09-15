# Final evidence matrix after staging integration

| Behavior | Before | After | Shared fixture | Visible delta |
|---|---|---|---|---|
| Search masternode initial/continued | eb895be71a7207c73fb9329ac9d9bb7b398f53da, independent server3240 | 8daa34c0db30efa338c3bcbed762c810b406dd2f, independent server4194 | fresh guest, same query and live English timeline,1440x1000,en-US,UTC,light | honest scope and continuation reach older matching posts; upstream resolved authors preserved |
| Initial/continued offline failure | same before build normal success capture | same final head, actual browser offline transport | loaded real page and data | readable initial failure or retained results/cursor with retry |
| No-match exhaustion | before has no continuation | same final head | QA-no-match-history-20260915 | full cursor scan reaches real end and removes continuation |

These final images explicitly supersede artifactfff6d0545097053231a9fb6ac51d697e45163b8d (before4105c5d1 / headc4bd6206), captured before staging merged upstream enrichment PR405. No old images will be used in final comparison. No fabricated application state or network responses.
