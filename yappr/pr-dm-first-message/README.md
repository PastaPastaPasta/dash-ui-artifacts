# DM first-message evidence

Before: live `https://yap.pr/devnet/messages/` seeded session (`EEKarQ...1ikD`) after the first-message probe; the conversation list remains empty and no message is visible. Captured 2026-09-15.

After: deterministic local UI fixture representing the same conversation after the corrected `directMessage` payload is accepted. This is synthetic because the staging DM contract was unavailable during capture; it demonstrates the intended persisted-message state and is paired with the payload regression test in the PR.

Base revision: `4105c5d1`
PR head: recorded in the PR once opened.
