# R5 / QA82 exact restack evidence

Exact before #485 b5b72b15421cdb8df1e4ed600f0dfa4e2e8a8a9f; after #493 eef277a640d2226c8ee127e1a6a78e0308c8316c. Production devnet3299/3297, Chromium1440x1200 scale1 light en-US America/Chicago; fresh normal password logins, compiled About hashes checked.

|Surface|Before fixture|After fixture|Visible claim|
|---|---|---|---|
|First Enable|79 actual firstEnable from R4 capture, keyretained but requestpaneldisabled|fresh80 firstEnable|Enabled dashboard/requests/followers agree immediately; distinctIDs disclosed because stateimmutable|
|Revoke|Same39/38 request created duringS06, firstapprove/revoke epoch2→3|Same39/38 originalrequest reapprove/revoke epoch3→4|Beforelist0 butdashboard1/oldepoch; afterall0/new epoch immediately|
|Requests|Beforelocalqueue stayscleared untilreload afterrevoke|Sameoriginalrequest returns afterrevoke|Refreshsubscription agreesfreshquery|
|Recovery/key compatibility|#485base includes509refusal andacceptedkeystorage|Sameinheritedcode and3browserfailure tests|Noresetaction;keypersistsbeforebroadcast|

No reset action or private posts. Preserve synthetic feed/vault states. Final normal UI cancel38request via #502 correctedPendingstate if needed, removeordinaryFollow; independentreadbackzero. S06 preferences already restored after live privateevent-alloff check.
