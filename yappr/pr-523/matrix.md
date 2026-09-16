# QA127 evidence matrix

| Behavior | Before exact base | After full signed head | Shared fixture | Expected delta |
|---|---|---|---|---|
| Active sender receives published recipient read receipt | cf0efbc10b8757137063113ebbd2061e8b87d8f7 | 66ebbcad32d95cbac8e763acd7c905e4912b2183 | Sender74→recipient75, same conversation cQ9tSFpscD/RFA==, same message6gKVSiGm1Apn5pmkFdmQgUBccizCo4q8EWe7wtQnX8DY, same1440x1000lightChromium | Both opened before receipt; after recipient publishes receipt, baseline stays unread while head shows Read without reload or newmessage |
| Receipt privacy disabled | same | same | same message | No published receipt and no Read in either sender session |

Ordinary UI identity/WIF login only. Independent production builds and browser contexts use realdevnet. Recipient privacy toggle is ordinary UI. SDK public metadata readback verifies receipt timestamp, no message ciphertext/decryption keys published. One audit-labelled direct message remains because UI has no delete control.
