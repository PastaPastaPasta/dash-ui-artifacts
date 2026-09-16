# QA136 notification preferences

Before exact staging cf0efbc10b8757137063113ebbd2061e8b87d8f7. After full head 1a24e56398cf82932eae275afe8482f81bb0747e.

| Surface | Before | After | Shared fixture | Delta |
| --- | --- | --- | --- | --- |
| Desktop settings | Push Notifications, ineffective Messages switch | In-app notifications, six supported switches | Unnamed QA identity, normal login, default settings, light 1440×1000 | Accurate scope and supported choices |
| Mobile settings | Same misleading heading/row | Accurate heading, supported choices | Same identity, light390×844 | Clear matching mobile comparison |
| Other preferences | Six supported switches | Same six switches | Toggle/reload/restore via ordinary controls | Compatibility verified procedurally |

Independent exact production builds and static adapters. No storage injection or server writes. The saved messages boolean is preserved by unchanged storage code; source audit confirms no messages event consumer/push API implementation. This UI correction does not claim OS delivery testing.
