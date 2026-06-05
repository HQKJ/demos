import { Check } from 'lucide-react'
import type { ReturnExchangeFlow } from '../types'
import { PrototypeFrame } from '../components/PrototypeFrame'

interface SuccessPageProps {
  flow: ReturnExchangeFlow
}

export function SuccessPage({ flow }: SuccessPageProps) {
  return (
    <PrototypeFrame>
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="text-green-600" size={32} />
          </div>
          <h2 className="mb-2 text-2xl font-semibold">Return Submitted Successfully!</h2>
          <p className="text-gray-600">
            Your return request has been received. We'll send you a confirmation email shortly.
          </p>
        </div>

        <button
          className="w-full rounded bg-gray-800 py-3 text-white transition-colors hover:bg-gray-900"
          onClick={flow.actions.handleStartNewReturn}
        >
          Start New Return
        </button>
      </div>
    </PrototypeFrame>
  )
}
