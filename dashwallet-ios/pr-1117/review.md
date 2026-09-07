# Review of DashPay any-balance payments

Scope: iOS 9e5c39a3480d4a9f0d706257c86ed72a2d935251..fc66451c570d2259aab27cfd7dcb8577972ac7ac and SDK prerequisite 0298af619167992fa23810d064dc333be72d80bf.

## Findings

No unresolved blocking finding identified in the final change. Earlier passes fixed a coordinator error enum mismatch (caught by build), wallet-network transition validation, and clipboard access during fixed-recipient contact sends (caught in Simulator). Review included actual diffs for correctness, maintainability, architecture, and monetary authorization/reliability.

## Open questions and assumptions

- No accessible fixture has established DashPay contacts. Live contact payout and receiving-side detection were not exercised; screenshots show synthetic data in production views, without submitting funds.
- SDK address reservation persists consumed addresses. Failed/cancelled post-reservation withdrawals leave unused address gaps; there is no automatic retry or rollback of an exposed address.
- Opaque SDK withdrawal errors are treated conservatively as unknown submission. This can require manual checking even for pre-broadcast SDK failures, but avoids presenting a retry that could duplicate a spend.
- History stores device-local submission provenance, without Core payout txid or final receipt reconciliation. Tests cover journal behavior, not an end-to-end live payment.

## Approval status

APPROVED WITH SUGGESTIONS: follow up with a live testnet contact delivery smoke when an established contact fixture is available. SDK dependency must land before this app change.

## Simplification review

Candidates considered: duplicating source/amount/fee UI, duplicated submission handling, and another persistence abstraction. The implementation reuses SendSourceScreen, ExternalSendAmountScreen, SendConfirmSheet, existing fee preflight, and one submitWithdrawal helper. The Foundation journal remains small and directly testable via a temporary directory; no further style-only refactor was applied. Existing Transparent atomic contact sends are preserved.

## Validation

- Clean source builds, install, launch-liveness checks: exact iOS base and head with final SDK dependency, arm64 iPhone 16 Pro / iOS 26.5.
- Eight Foundation journal XCTest tests passed (the full app test target has existing breakage).
- SDK: 61 payment tests, clippy, formatting, release simulator FFI and Swift example build passed.
- Accessibility: no new blocking findings. Git diff checks and signed commits verified.
- Rebase range-diff: three identical patches; the fourth preserves the no-clipboard contact guard while retaining upstream clipboard lifecycle gating.

Follow-up review: CodeRabbit identified that the sendToContact recipient argument remained optional. Verified the only call site already supplies it. The parameter is now required, with unconditional pre/post-auth validation. Local arm64 dashpay build and a11y audit pass. No UI behavior change.
