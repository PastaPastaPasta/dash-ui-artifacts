# govhub: proposal fee step asks for a bit more than 1 DASH

- Before: exact base `fad4286bd838d30de5578fb91f18a95f83e018dd` (PastaPastaPasta/govhub main)
- After: PR head `b8b39213c253556964baa20a2de4eff87fc6d690` (branch `fix/proposal-fee-headroom`)
- Fixture: the app's fixture/demo mode, same draft (`govhub-wizard-demo`, 12.5 DASH x 3) signed in as the demo user Alice; light theme.
  Desktop 1280x900 viewport, phone 390x844. Each image is an element screenshot of step 4 (`[data-testid=p-pay]`).
- The one-time deposit address differs between runs: the demo derives a fresh key each run.
- Note: the demo's deposit amount was hard-coded to 1.00001 DASH on the base, so the "before" deposit line looks right in the demo;
  on the real path it showed the unrounded minimum (1.00000235) while the QR code asked for 1.00001.

| State | Before | After |
|---|---|---|
| Choose how to pay (desktop) | before/desktop-step4-choose.png | after/desktop-step4-choose.png |
| Choose how to pay (phone) | before/phone-step4-choose.png | after/phone-step4-choose.png |
| Deposit QR (desktop) | before/desktop-step4-deposit.png | after/desktop-step4-deposit.png |
| Deposit QR (phone) | before/phone-step4-deposit.png | after/phone-step4-deposit.png |
