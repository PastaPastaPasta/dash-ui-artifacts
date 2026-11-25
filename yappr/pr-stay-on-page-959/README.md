# yappr #959 — stay on the page after signing in from the sign-in sheet

- Before: exact base `4437491a40afcbbfc3046d466a91d6a0711e970a` (staging)
- After: PR head `68d8f9ecc103e6dcc4a808c490a7629df3e2782c`
- Both built with `npm run build:testing` (the /testing bundle, dedicated testnet test contracts) and driven by the same Playwright script at 1280x900.
- Fixture: For You feed scrolled three pages deep (35 posts loaded) while signed out; target post `GZLC469UvBRZEgWY7gXpgzHcF8ASBZUDDG2QhgrbqQvP`; tap Like, sign in with a throwaway testnet QA identity's key in the sheet.

| File | Shows |
|---|---|
| before/1, after/1 | Signed out, deep in the feed, before tapping Like |
| before/3 | Base: after sign-in the feed is back at the top; the target post is off screen |
| after/3 | Head: after sign-in the same posts are on screen; 35 posts still loaded |
| after/4 | Head: Like tapped as the new account, heart filled |
| after/5 | Head: the thread page reads that account's like (the like count read fails on the /testing contract independently of this change) |

The like was undone at the end of the run.
