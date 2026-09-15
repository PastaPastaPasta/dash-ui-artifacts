'use client'

import { useEffect, useState } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { PaymentUriInput } from '@/components/profile/payment-uri-input'

// Capture-only fixture around the unchanged product component API.
export default function ProfilePaymentValidationFixture() {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const [uris, setUris] = useState<string[]>([])
  return (
    <PageShell>
      <div className="p-8">
        <h1 className="mb-2 text-xl font-bold">Profile payment addresses — QA fixture</h1>
        <p className="mb-8 text-sm text-gray-500">Actual PaymentUriInput. Changes remain in local fixture state.</p>
        <PaymentUriInput uris={uris} onChange={setUris} />
        <aside className="mt-8 rounded-lg border border-gray-300 p-4 text-sm">
          <h2 className="font-bold">Test-only change observer</h2>
          <p className="text-xs">Fixture: <span data-testid="fixture-ready">{ready ? 'Ready' : 'Loading'}</span></p>
          <p>Accepted URI count: <strong data-testid="uri-count">{uris.length}</strong></p>
          <pre className="mt-2 whitespace-pre-wrap break-all" data-testid="accepted-uris">{JSON.stringify(uris)}</pre>
        </aside>
      </div>
    </PageShell>
  )
}
