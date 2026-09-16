# QA139 evidence plan

Before: exact baseline cf0efbc10b8757137063113ebbd2061e8b87d8f7, shared independentlybuilt server3288.
After: final signed fullhead to record before finalcapture; separate committed production devnet build/server3375.

Fixture: blog BdMQRKM6xT8jx4bKbkhP3wYo7V835pDjcEWTbN5PMNRU; article GYHfwBcMLfbUP7cKovkKPYiScN4d2g2fTF8H3Gm9KZN; slug qa-pagination-fixture-02-p64. Owner64 CNARhSLcQRfdxLZXTrvDVtVGKg1RHXjwJTpGSd2DXLGw; reader/commenter65 9cjhprZAFUDVG71Fo8b5eCzHpwjo9Aj9npcRRpmCJBbw. Parent released all previouscomments, freshzero startingstate. Only65writes; restorezero after.

Create one normal temporarycomment through UI and record actual documentID. Use same comment for exactbase/head offlineDelete; both failures must retain it andunlock controls. Use same drafttext for exactbase/head offlinePost; both must retain it andunlock controls. Fresh browser contexts, same viewport/theme/route/scroll, actual context offline only, no forged responses/DOM changes. Seeded identity session explicitlydisclosed (not login evidence).

| Mutation | Before | After | Verification |
|---|---|---|---|
| Offline delete of own comment | Incorrect You can onlydeleteyour owncomments toast | Accurate Failed todeletecomment /retry toast | PNG with toast+sameownrow; row retained; Delete enabled |
| Offline post | RawgRPC/JStransport error toast | Accurate Failed topostcomment /retry toast | PNG with toast+same retaineddraft; Post enabled |
| Reconnect retry | Existing retry works | Retry creates/deletes once and reload confirms | Procedural assertions, no invented visible delta |

Relative timestamp may advance during build/capture; disclose ratherthan claimingall pixels excepttoast unchanged. Detailed errors remain logger-only; do not publish secrets or rawcompleteSDKlogs.
