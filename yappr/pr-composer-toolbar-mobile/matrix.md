# Composer toolbar mobile evidence

Exact base cf0efbc10b8757137063113ebbd2061e8b87d8f7; exact head 938a771f8222eabd6327922e3f12761c85dbb60c. Real persona55 session, matching light theme,320x844 and same local draft. No post submissions.

|Surface|Before|After|Expected visible change|
|---|---|---|---|
|Single post toolbar,320px|Exact base|Exact head|Poll button clips outside editor; head wraps to a visible row|
|Thread editor toolbar,320px|Exact base|Exact head|Controls fit editor; wrap as needed|

Compatibility:390px/1280px, button bounds, poll add/remove, formatting, thread add/remove, keyboard traversal; no publication. Header clipping is separate QA110 and is unchanged here.
