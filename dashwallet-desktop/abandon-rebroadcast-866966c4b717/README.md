# Abandon and Remove unconfirmed transactions

Before images use merge base eebb848bd12b8a7e6fb56aef3b281a852fb880fc. After images use head 866966c4b7172ca5048f214b2c8206b3834ed80a. Independent fixture builds ran in the pinned Chromium container at 1280×820, en-US, in light and dark.

- Activity with spending wording opens the Abandon confirmation in the abandon-debit-unknown fixture, on the transaction whose ID consists of 32 d0 bytes. It exercises this wording when the debit amount is unknown.
- Activity with unresolved inputs opens the Abandon confirmation for the pending 0.20 tDASH transaction at 01:40 in the funded fixture. It exercises this wording when no debit was found.
- Repair opens Tools → Repair → Remove unconfirmed transactions in the funded fixture.

The updated confirmations explain the reservation on abandoned moves or consolidations of mixed coins and remove the manual restart instruction.
