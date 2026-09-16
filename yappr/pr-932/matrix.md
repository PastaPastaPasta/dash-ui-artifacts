# QA147 profile publication evidence matrix

| Behavior | Before | After | Shared fixture | Expected delta |
|---|---|---|---|---|
| Publishing through global composer while viewing own profile | exact cf0efbc10b8757137063113ebbd2061e8b87d8f7 | 932d56e6ca5da34a030417a0e4cc7432f4786423 | Same QA identity74, identical labelled text, normal UI login, 1440×1100 light Chromium | Baseline success leaves list/count stale until reload; head shows canonical new post/count without reload |
| Loaded history retention | baseline unchanged | 932d56e6ca5da34a030417a0e4cc7432f4786423 | Own profile with >50 prior records | Newly created post adds to the existing paginated history without dropping older loaded IDs |
| Inactive tab | baseline unchanged | 932d56e6ca5da34a030417a0e4cc7432f4786423 | Own Replies tab and new ordinary root post | Active tab remains Replies; switching to Posts reveals the new root without reload |
| Other profile isolation | baseline unchanged | 932d56e6ca5da34a030417a0e4cc7432f4786423 | Logged in74, viewing75 | Posting as74 must not insert into75's list or change75's count |

Separate normal writes necessarily produce different post IDs; both source revisions share the same account and exact primary text. All real test posts are deleted through the ordinary owner UI after validation; immutable tombstones remain. No auth/storage/DOM/response injection. Independent public SDK reads verify documents and cleanup.
