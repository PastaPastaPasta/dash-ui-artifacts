# CSP / Cloudflare Insights evidence

Before is the live devnet page at staging base `4105c5d`; Chromium console recorded a CSP violation for the injected `static.cloudflareinsights.com` beacon. After is the same page capture from PR #406 head `f4c52c2c`, with the CSP allowlist updated. The screenshots show the same page framing; the policy violation itself is a browser-console diagnostic, recorded in the PR body.
