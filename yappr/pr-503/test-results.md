# Actual isolated Creators regression

Same test, same dedicated devnet fixture, real chain, retries disabled and trace disabled.

- Before exact `cf0efbc10b8757137063113ebbd2061e8b87d8f7`: 1 failed. All four early-click attempts left the Creators leaderboard absent; last assertion timed out after 30 seconds. Exit 1 at 2026-09-16T03:49:41.072Z.
- After exact `a634847c16a7f664124ec2485eff0c912e8a3c77`: 1 passed, test 2.5s (total3.0s), exit0. `explore-top-creators` visible after the first click.

Command: `npx playwright test --project=write --trace=off --retries=0 topology --grep='the Creators tab'`. E2E_BASE_PATH=/devnet, E2E_ENV_FILE=.env.devnet, NETWORK=devnet, dedicated identity override. The secret was read privately into process environment and never published.

E2E TypeScript check and committed devnet production build pass. This is not a claim that the whole topology suite independently passes: QA98 credentials and QA112 v6 setup are separate prerequisite repairs. A broader local v5 attempt encountered an unresolved post submission failure while remote CI was using the same identity; it is not counted as passing and requires serial rerun.
