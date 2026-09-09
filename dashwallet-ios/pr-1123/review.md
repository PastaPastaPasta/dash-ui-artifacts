# Code review

Scope: 5f4cefc1dff9eb38e2e68b6b8a290a2557ff77ff..2bfee9e3cfeba384799449de54c5495dc25f7223

Correctness: balance > 0 in raw credits; first positive observation marks wallet/network before notification. Both persisted startup and live SwiftData balance paths invoke it. Zero/error/teardown paths cannot enable or consume the marker. Already-enabled mode records the marker without duplicate notification. Manual off remains effective after refresh/refunding/relaunch.

Maintainability: uses existing options store and notification; no new coordinator/singleton. Shared helper prevents notification duplication across Settings and balance paths.

Architecture: coordinator and Settings run on MainActor; deletion primitive invokes cleanup after successful SDK deletion; full wipe resets history only after successful SDK wipe. Marker follows wallet ID, not whichever wallet the UI happens to display.

Reliability: scalar preference and marker persist in app UserDefaults; no network actions or key material in policy. Settings rereads actual global preference on notifications. Failed deletion preserves history.

Findings: no blocking issues identified.
Assumptions: first funding in another unhandled wallet/network may turn the global mode back on, as agreed in the plan. Existing explicit off is overridden only on the first funded observation.
Status: APPROVED (runtime QA tracked separately).

# Simplification review
Considered removing the coordinator helper and introducing a separate policy singleton; rejected both since the helper serves two paths and the existing options store already owns persistence. Retained the small implementation. The Send compile fix also replaces optional indexed access with first-element binding without changing selection priority.

# Automated checks
16 Foundation regression checks pass, compiling the actual DWGlobalOptions and DSDynamicOptions implementations. Unrelated wallet/keychain symbols are stubbed.
SwiftLint: 56 existing findings in the touched Swift files on both base and head; zero new findings.
Accessibility: zero new blocking findings.
Xcode test: dashpay scheme is not configured for test action; direct regression executable is runnable independently.
