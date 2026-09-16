# PR414 rebase evidence matrix

| Surface | Before exact staging base | After full PR head | Shared fixture | Expected visible delta |
|---|---|---|---|---|
| Desktop and mobile focused post overflow | c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0 | 493604551a19d37eb6e7972239f699ff768a7158 | Post8Pu2yqcvPTnhtikJ2cWRnC2eukzLFHSJkrVEimGUjf47, persona8 normal UI login, dark theme | Named Post options tooltip |

Compatibility checks: preserved action labels and repost tooltip; Enter/Escape/expanded/focus restoration. No menu action submitted. Chromium1280x900 and390x844, en-US, America/Chicago. Base3260 and head3264 separately built production devnet exports. Credentials stay private and absent from screenshots.
