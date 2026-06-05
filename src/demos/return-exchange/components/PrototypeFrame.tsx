import type { ReactNode } from 'react'

interface PrototypeFrameProps {
  children: ReactNode
}

export function PrototypeFrame({ children }: PrototypeFrameProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-8">
        <h1 className="text-5xl font-bold tracking-wider text-gray-800">TIDEWE</h1>
      </div>
      {children}
      <ContactBlock />
    </div>
  )
}

function ContactBlock() {
  return (
    <div className="mt-8 text-center text-gray-600">
      <p>Questions?</p>
      <p>
        Contact{' '}
        <a className="text-red-600 underline hover:text-red-700" href="mailto:support@tidewe.com">
          support@tidewe.com
        </a>
      </p>
    </div>
  )
}
