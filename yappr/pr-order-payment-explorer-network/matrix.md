# Evidence matrix — PR #474 review correction

| Surface or behavior | Before revision/state | After revision/state | Shared fixture | Expected visible delta |
| --- | --- | --- | --- | --- |
| Seller order transaction link | Exact base c98a6ecd7e26ae5bc9fc8e400e6011eb8465b3a0 | 081a50993a7e72480fbd81e9e5cd020d7fd147b6 | Same paid order 2T8ThBeiKHy7ajPLe1bzjGgyN9RudXZXhaQ1byNZS7uZ | Destination changes from testnet to Moutai; seller UI otherwise compatible |
| Transaction explorer opened by that link | Same exact base | Same final head | Transaction 4408369deb53d9888a3f269efb8294b56b0b989891485d05b0278f9e1a7c050a | Wrong network returns 404; correct network displays the confirmed payment |
| Missing/non-string URI guard | Prior PR head 79e44e6b626f7595d47fe6f42a78fa87c6817447 | 081a50993a7e72480fbd81e9e5cd020d7fd147b6 | Six decoded JSON shapes in local unit tests | Non-visual compatibility: helper returns null rather than throwing. No malformed order is persisted or injected into live data |

The original before/after comparison remains exact base versus full final PR head. The isolated malformed-input regression test explicitly compares PR iterations and is not presented as pre-PR visual evidence.
