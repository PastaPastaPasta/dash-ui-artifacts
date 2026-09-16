| Surface or behavior | Before revision/state | After revision/state | Fixture controls | Expected visible delta |
|---|---|---|---|---|
| Completed Enable Private Feed | 733faf53cd893cba861476a4af75b442ed67ca72; actual first enable for persona39 | Final signed head; actual first enable for persona60 | Separate reserved synthetic devnet owners (first enable cannot be repeated safely); registered encryption key4/auth2; password-enabled unlocked vault; 1440x1200 light en-US America/Chicago, same /devnet configuration | Enabled feed with amber key-not-entered prompt changes to green key-stored status |
| Reload and fresh password login | Baseline manual-entry control already demonstrated separately | Final head after successful Enable | Same persona60 owner, same feed; fresh browser for password login | Key retained without redundant manual entry |

Both owners start with no feed, grants, or private posts. Distinct owner IDs and public sidebar activity differ; they are disclosed in the PR/index. No feed is reset or deleted for evidence. Never capture populated secret fields. The shared-refresh sibling-panel defect is separate QA82 and intentionally remains outside this change.
