# QA92 evidence plan

Before cf0efbc10b8757137063113ebbd2061e8b87d8f7 at http://127.0.0.1:3288/devnet. After signed full head1941770bd5e371bda760db3ca4b26c712489d1e2 at http://127.0.0.1:4292/devnet, built independently. Both use identical /tmp/yappr-saved-address-serve.py adapter, Chromium1280x900, light theme, seeded merchant62 session. Shared actual store CP3dEXrdMEbbiFNHakoRkC86DonfVftuzUyaY4ngrnQb has two persisted policies and synthetic metadata. No saves during capture.

| Surface | Shared action | Expected visible delta |
|---|---|---|
| Store Name | Click visible label | Before focus stays BODY; after input gets focus ring/caret |
| Policy Content, row2 | Click visible label | Before no focused field; after matching row2 gets ring/caret |

Procedural compatibility: all4metadata controls and4policy fields have expected names and label-focus; add/remove a draft policy leaves unique IDs and correct pairings; no draft saved. Desktop/mobile layout unchanged. Before uses placeholders/unnamed select; source change is associations only.
