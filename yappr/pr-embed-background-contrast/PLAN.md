# QA100 evidence plan

Base cf0efbc10b8757137063113ebbd2061e8b87d8f7 production3288. Head70e8836a613132950e505525d38524aee383ee04 production3361. Same actual article66syyLM2ZAakx2JNZuMJw4PY896cphx8Q2vc1kVCNTK ownerCNARhSLcQRfdxLZXTrvDVtVGKg1RHXjwJTpGSd2DXLGw. No public writes or app response injection.

| Surface | Before | After |
|---|---|---|
|Light actual embed desktop overview | dark inherited text on default dark panel | reader-matching light text |
|Light actual embed320px focused panel, y200 | highlighted text almost invisible | same text readable |
|Declared standalone style fixture | normal text/link inside dark panel, missing-background case | scoped foreground/link and fallback remain readable |

Actual Dark embed compatibility measured separately. Standalone style fixture uses exact source EMBED_STYLES, ordinary hand-declared HTML for text/link/code and no-background markup; clearly labeled as a style fixture, not a Platform document or product response. Compute contrast against both gradient endpoint colors, with alpha blending; verify scoped link does not alter outside Light links.
