import { ChevronDown, CircleHelp, Search } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import * as Tooltip from '@radix-ui/react-tooltip'
import { usStates } from '../data'
import type { ReturnExchangeFlow } from '../types'
import { PrototypeFrame } from '../components/PrototypeFrame'

interface AddressConfirmationPageProps {
  flow: ReturnExchangeFlow
}

export function AddressConfirmationPage({ flow }: AddressConfirmationPageProps) {
  const { shippingAddress } = flow.state
  const { handleAddressConfirm, handleExchangeBack, setShippingAddress } = flow.actions

  return (
    <PrototypeFrame>
      <div className="w-full max-w-2xl">
        <div className="space-y-6">
          <div className="rounded border border-gray-300 bg-white p-8">
            <h2 className="mb-6 text-xl text-gray-700">Delivery</h2>
            <div className="space-y-4">
              <Select.Root
                value={shippingAddress.country}
                onValueChange={(value) => setShippingAddress({ ...shippingAddress, country: value })}
              >
                <Select.Trigger className="flex w-full items-center justify-between rounded border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Country/Region</div>
                    <Select.Value />
                  </div>
                  <Select.Icon>
                    <ChevronDown className="text-gray-400" size={20} />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    <Select.Viewport className="p-1">
                      <Select.Item
                        className="cursor-pointer rounded px-4 py-3 outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100"
                        value="United States"
                      >
                        <Select.ItemText>United States</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>

              <div className="grid grid-cols-2 gap-4">
                <input
                  className="rounded border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onChange={(event) =>
                    setShippingAddress({ ...shippingAddress, firstName: event.target.value })
                  }
                  placeholder="First name"
                  type="text"
                  value={shippingAddress.firstName}
                />
                <input
                  className="rounded border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onChange={(event) =>
                    setShippingAddress({ ...shippingAddress, lastName: event.target.value })
                  }
                  placeholder="Last name"
                  type="text"
                  value={shippingAddress.lastName}
                />
              </div>

              <div className="relative">
                <input
                  className="w-full rounded border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onChange={(event) =>
                    setShippingAddress({ ...shippingAddress, address: event.target.value })
                  }
                  placeholder="Address"
                  type="text"
                  value={shippingAddress.address}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>

              <input
                className="w-full rounded border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onChange={(event) =>
                  setShippingAddress({ ...shippingAddress, apartment: event.target.value })
                }
                placeholder="Apartment, suite, etc. (optional)"
                type="text"
                value={shippingAddress.apartment}
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  className="rounded border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onChange={(event) =>
                    setShippingAddress({ ...shippingAddress, city: event.target.value })
                  }
                  placeholder="City"
                  type="text"
                  value={shippingAddress.city}
                />
                <Select.Root
                  value={shippingAddress.state}
                  onValueChange={(value) => setShippingAddress({ ...shippingAddress, state: value })}
                >
                  <Select.Trigger className="flex items-center justify-between rounded border border-gray-300 bg-white px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400">
                    <div className="text-left">
                      <div className="text-xs text-gray-500">State</div>
                      <Select.Value />
                    </div>
                    <Select.Icon>
                      <ChevronDown className="text-gray-400" size={16} />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="max-h-60 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                      <Select.Viewport className="p-1">
                        {usStates.map((state) => (
                          <Select.Item
                            className="cursor-pointer rounded px-4 py-2 outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100"
                            key={state}
                            value={state}
                          >
                            <Select.ItemText>{state}</Select.ItemText>
                          </Select.Item>
                        ))}
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
                <input
                  className="rounded border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onChange={(event) =>
                    setShippingAddress({ ...shippingAddress, zipCode: event.target.value })
                  }
                  placeholder="ZIP code"
                  type="text"
                  value={shippingAddress.zipCode}
                />
              </div>

              <div className="relative">
                <input
                  className="w-full rounded border border-gray-300 px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onChange={(event) =>
                    setShippingAddress({ ...shippingAddress, phone: event.target.value })
                  }
                  placeholder="Phone"
                  type="tel"
                  value={shippingAddress.phone}
                />
                <Tooltip.Root delayDuration={200}>
                  <Tooltip.Trigger asChild>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                      Phone number for delivery updates
                      <Tooltip.Arrow className="fill-gray-800" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="flex-1 rounded border border-gray-300 py-3 transition-colors hover:bg-gray-50"
              onClick={handleExchangeBack}
            >
              Back
            </button>
            <button
              className="flex-1 rounded bg-gray-800 py-3 text-white transition-colors hover:bg-gray-900"
              onClick={handleAddressConfirm}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </PrototypeFrame>
  )
}
