# PR485 refreshed evidence matrix

| Surface or behavior | Before — exact PR483 parent | After — full PR485 head | Controlled setup | Expected delta |
|---|---|---|---|---|
| Immediately after first Enable | `e65d33681a6c289fa0255bde0d8dfd0366193664`, persona78 | `b5b72b15421cdb8df1e4ed600f0dfa4e2e8a8a9f`, persona79 | Registered encryption key4; unlocked password vault; first private-feed creation; epoch1, zero followers | Before reports key missing and requests it again; after reports key stored with no redundant entry button. |
| Reload | Same parent and persona78 | Same head and persona79 | Same respective browser session | Missing before; stored after, verified by browser assertions. |
| Fresh password sign-in | Same parent and persona78 | Same head and persona79 | New browser contexts, normal password sign-in, same respective password vault | Before still lacks key; after restores accepted key through vault login. |
| Storage-write and vault-backup failures | Parent component negative regression | Head component, three passing browser cases | Explicitly mocked chain/auth-vault boundaries, real component and browser secret store; public dummy scalar1 | Correct warnings/status refresh; no false enable-failed toast; local key retained after backup failure. Nonvisual regression coverage, not live failure injection. |

Before owner: persona78 `streetbianca8`, identity `9LQjbxV6BiArha9QiiLAp1ziN2i497SR1giWvxZD4b2R`.
After owner: persona79 `fatima-writes4`, identity `mxntRqug49iiEeka2RDRnQrf8hJZBkkQe971Am68wnJ`.

Distinct owners are necessary because private-feed creation is immutable. Both were provisioned equivalently for the first-enable flow. No feed reset/delete was used. Their avatars, handles, identities and public post counts differ; the comparison makes no claim about those values.

Independent production devnet builds served at localhost3297 (before) and localhost3299 (after), About hashes verified. Devnet moutai, checked-in .env.devnet, en-US, America/Chicago, light theme, Chromium1440x1200 at device scale1, same private-feed settings route and top scroll position. Six final images were opened and inspected at original resolution. The focused images are native element captures of the same settings card; the card becomes shorter because the redundant key-entry button disappears. Credentials were absent/empty at capture; no authentication snapshot, DOM replacement, mocked network response, or injected product state was used for the live images.
