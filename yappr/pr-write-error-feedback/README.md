# Yappr write error feedback

- Product base: `4105c5d1` (origin/staging)
- Product head: `32318226` (PR branch)
- Fixture: deterministic synthetic post action at 1280x720; no identity, private key, or personal data.
- Before shows the generic failure toast from the base UI.
- After shows the actionable insufficient-YAPP message. Bookmark state is also rolled back in the same catch path.
