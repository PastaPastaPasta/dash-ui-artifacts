# dash-forge: Explore repo card alignment

- Before: forge.dashhq.org live build ad3c80b9 (forge-web identical to base 3f86f44d)
- After: PR head f116911def46309569286e222c0ef933de62b752, `next dev` on testnet
- Fixture: testnet /explore/, "Recently active" section, same 7 repos in both, logged out, light theme
- Measured card heights (px): before 1366 = 122,122,122,170,170,170,122; after 1366 = 166 x7; before 900 = 122,122,122,122,142,142,122; after 900 = 142 x7
