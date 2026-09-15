# Auth Vault normal-flow QA

Exact staging source: `4105c5d1c914f5d0838619da93c3b8d28b4a780e`, existing independently built devnet export on localhost:3211, connected to real devnet. No product code changes or credential injection.

Assigned account: persona 39, `hikes-omar8`, identity `9NFhqxW8upkFMVTE5h5VmYWLdSEJ26B2iMKdhCFgsWkd`. Only this identity may be changed.

| User story | Actual interaction | Evidence |
| --- | --- | --- |
| Enroll password unlock | Sign in by provided WIF via normal UI, open Auth Vault, submit strong random password | Empty setup and success/status UI, no credentials |
| Return by password | Log out, sign in using same password | Signed-in identity/profile and vault status, reload confirmation |
| Restore fresh browser | New empty browser context, same username/password | Signed-in identity/profile and vault status |
| Enroll passkey | Browser virtual authenticator, normal UI ceremony | Success or explicit prerequisite error |
| Return by passkey | Logout, UI sign-in with authenticator | Restored account or exact visible failure |

Screenshots use Chromium 1440×1200, en-US, America/Chicago. Passkey relying-party origin is localhost in this controlled baseline build, not yap.pr. Any virtual authenticator is explicitly test equipment, not a physical device claim. Passwords, private keys, browser storage, and authenticator credentials stay in private local fixtures, never evidence artifacts or logs.
