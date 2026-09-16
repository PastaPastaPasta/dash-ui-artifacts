# QA82 final evidence and validation matrix

Exact base `733faf53cd893cba861476a4af75b442ed67ca72`; full signed head `471094556c8d5d9457676f205dfe4df2a0742117`. The original capture matrices recorded intended checks; this final matrix records actual outcomes and supersedes their planned reset expectation.

| Behavior | Before | After | Evidence/limit |
|---|---|---|---|
| First Enable | Owner 39 settings enabled; Requests still says enable feed; recorded Followers also disabled | Owner 61 dashboard, Requests and Followers enabled without reload | Different owners because first Enable cannot be replayed; before crop ends at Requests card |
| Revoke after approve | Owner 39 list 0, dashboard 1, epoch 1/0 revocations; remains stale after 5sec | Owner 61 list 0, dashboard 0, epoch 2/1 revocation before reload; reload agrees | Same actor 38, separate otherwise equivalent empty-feed cycles |
| Pending request after revoke | Initial harness incorrectly expected 0 and failed; fresh login shows original request | Refresh immediately displays original pending request | Separate QA94 lifecycle issue; not a new request or a claim that revocation failed |
| Encryption key after first Enable | Session key not retained | Same known behavior; normal manual key entry used before approve/revoke | Separate QA81; this PR does not fix key retention |
| Reset compatibility | Not used in baseline cycle | Reset fails with immutable privateFeedState update error, after deleting rekey history | Separate QA109; no reset pass claim. Reset-success refresh callback only source-reviewed |

Normal UI actions and separate production devnet builds 3278/3297; compiled About hashes verified by the capture runs. Chromium 1440×1200, scale 1, light, en-US, America/Chicago. No injected application/auth state, network mocks, private posts or direct-service writes. Parent owns all further fixture work; publication performs no writes.
