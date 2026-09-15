'use client'

import { useEffect, useState } from 'react'
import { PageShell } from '@/components/layout/page-shell'
import { PaymentMethodModal } from '@/components/store/payment-method-modal'

// Capture-only fixture. The product component is imported without modification.
// The observer replaces persistence and never sends a Platform state transition.
export default function PaymentValidationFixture() {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])
  const [saveCalls, setSaveCalls] = useState(0)
  const [saved, setSaved] = useState<{ scheme: string; address: string } | null>(null)
  return (
    <>
      <PageShell>
        <div className="p-8">
          <h1 className="text-xl font-bold">Payment modal — QA fixture</h1>
          <p>Actual PaymentMethodModal with an observed save callback.</p>
        </div>
      </PageShell>
      <PaymentMethodModal
        isOpen
        onClose={() => {}}
        onSave={async (data) => {
          setSaveCalls((count) => count + 1)
          setSaved(data)
          // Keep the pending submission visible. This fixture does not persist.
          await new Promise<void>(() => {})
        }}
      />
      <aside className="fixed bottom-4 left-4 z-[60] max-w-[360px] rounded-xl border-2 border-blue-500 bg-white p-4 text-black shadow-lg">
        <h2 className="font-bold">Test-only save observer</h2>
        <p className="text-xs">Fixture: <span data-testid="fixture-ready">{ready ? 'Ready' : 'Loading'}</span></p>
        <p>Callback invocations: <strong data-testid="save-count">{saveCalls}</strong></p>
        <p className="mt-1 break-all font-mono text-sm" data-testid="saved-uri">{saved ? `${saved.scheme}${saved.address}` : 'No save requested'}</p>
        <p className="mt-2 text-xs text-gray-600">Persistence is stubbed; no blockchain write.</p>
      </aside>
    </>
  )
}
