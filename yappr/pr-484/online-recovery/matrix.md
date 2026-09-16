# QA77 extended recovery evidence matrix

| Behavior | Before exact base | After full signed head | Shared fixture | Expected delta |
|---|---|---|---|---|
| Explicit post retry after address exhaustion while browser stays online | cf0efbc10b8757137063113ebbd2061e8b87d8f7 | 87bdb83bbb98497d0f9354e6841ca067a763a8ec | Persona74, same labelled single-post text, isolated ordinary UI login, light 1440×1100 Chromium, transport aborted before delivery then restored | Original retry fails locally, fixed retry broadcasts once and publishes; first failure remains failure and draft retained, no automatic write replay |
| Guest query recovery after browser offline→online | same | same | Real devnet ranked feed with populated posts | Head fresh query returns posts in same session |
| Guest query recovery while browser stays online | same | same | Real devnet ranked feed, DAPI abort then restore | Head fresh explicit Refresh returns posts |

No response fabrication, DOM, SDK or storage injection. Host SDK reads independently verify public post ID/count and eventual deletion. Scoped Playwright route.abort is transport fault simulation, not normal network behavior; it aborts before delivery without inspecting or modifying payloads. Single-post test avoids the separately reported partial-thread linkage defect.
