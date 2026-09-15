# Yappr write error feedback

- Product base: `f42ce65f` (origin/master)
- Product head: `288f6ffd` (PR branch)
- Fixture: deterministic synthetic post action at 1280x720; no identity, private key, or personal data.
- Before shows the generic failure toast from the base UI.
- After shows the actionable insufficient-YAPP message. Bookmark state is also rolled back in the same catch path.
