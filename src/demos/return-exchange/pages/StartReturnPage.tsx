import { ChevronDown, CircleHelp, Loader2 } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import * as Tooltip from '@radix-ui/react-tooltip'
import type { ReturnExchangeFlow } from '../types'
import { PrototypeFrame } from '../components/PrototypeFrame'

interface StartReturnPageProps {
  flow: ReturnExchangeFlow
}

export function StartReturnPage({ flow }: StartReturnPageProps) {
  const { email, isLoading, orderNumber, returnType } = flow.state
  const { handleSubmit, setEmail, setOrderNumber, setReturnType } = flow.actions
  const canSubmit = Boolean(orderNumber && email && returnType && !isLoading)

  return (
    <PrototypeFrame>
      <div className="w-full max-w-md rounded-lg bg-white p-12 shadow-md">
        <h1 className="mb-8 text-center text-2xl tracking-wide">START A RETURN</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              className="w-full rounded border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={(event) => setOrderNumber(event.target.value)}
              placeholder="Order number"
              type="text"
              value={orderNumber}
            />
            <Tooltip.Root delayDuration={200}>
              <Tooltip.Trigger asChild>
                <button
                  aria-label="Help"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <CircleHelp size={20} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="max-w-xs rounded bg-gray-800 px-3 py-2 text-sm text-white shadow-lg"
                  sideOffset={5}
                >
                  Your order number can be found in your order confirmation email.
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>

          <input
            className="w-full rounded border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
            type="email"
            value={email}
          />

          <Select.Root value={returnType} onValueChange={setReturnType}>
            <Select.Trigger className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-4 py-3 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 data-[placeholder]:text-gray-400">
              <Select.Value placeholder="Select return or exchange" />
              <Select.Icon>
                <ChevronDown className="text-gray-400" size={20} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                <Select.Viewport className="p-1">
                  <Select.Item
                    className="cursor-pointer rounded px-4 py-3 outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100"
                    value="return"
                  >
                    <Select.ItemText>Return</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="cursor-pointer rounded px-4 py-3 outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100"
                    value="exchange"
                  >
                    <Select.ItemText>Exchange</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          <div className="pt-4">
            <button
              className={`flex w-full items-center justify-center rounded py-3 transition-colors ${
                canSubmit
                  ? 'cursor-pointer bg-gray-800 text-white hover:bg-gray-900'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
              disabled={!canSubmit}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Loading...
                </>
              ) : (
                'Get started'
              )}
            </button>
          </div>
        </form>
      </div>
    </PrototypeFrame>
  )
}
