# govhub: proposal fee step asks for a bit more than 1 DASH

- Before: exact base `fad4286bd838d30de5578fb91f18a95f83e018dd` (PastaPastaPasta/govhub main)
- After: PR head `39d393f7ec79281749584fc0c20fca52483d8cd9` (branch `fix/proposal-fee-headroom`), in `after-39d393f/`.
  `after/` is from an earlier PR commit, `b8b39213`, whose copy repeated the amount; it is superseded.
- Fixture: the app's fixture/demo mode, same draft (`govhub-wizard-demo`, 12.5 DASH x 3) signed in as the demo user Alice; light theme.
  Desktop 1280x900 viewport, phone 390x844. Each image is an element screenshot of step 4 (`[data-testid=p-pay]`).
- The one-time deposit address differs between runs: the demo derives a fresh key each run.
- Note: the demo's deposit amount was hard-coded to 1.00001 DASH on the base, so the "before" deposit line looks right in the demo;
  on the real path it showed the unrounded minimum (1.00000235) while the QR code asked for 1.00001.

| State | Before | After |
|---|---|---|
| Choose how to pay (desktop) | before/desktop-step4-choose.png | after-39d393f/desktop-step4-choose.png |
| Choose how to pay (phone) | before/phone-step4-choose.png | after-39d393f/phone-step4-choose.png |
| Deposit QR (desktop) | before/desktop-step4-deposit.png | after-39d393f/desktop-step4-deposit.png |
| Deposit QR (phone) | before/phone-step4-deposit.png | after-39d393f/phone-step4-deposit.png |
