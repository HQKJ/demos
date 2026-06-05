import { ChevronDown } from 'lucide-react'
import * as Select from '@radix-ui/react-select'
import { orderItems } from '../data'
import { ImageWithFallback } from '../../../shared/components/ImageWithFallback'
import type { ReturnExchangeFlow } from '../types'
import { PrototypeFrame } from '../components/PrototypeFrame'

interface ExchangeSelectionPageProps {
  flow: ReturnExchangeFlow
}

export function ExchangeSelectionPage({ flow }: ExchangeSelectionPageProps) {
  const { exchangeVariants, selectedItems } = flow.state
  const {
    handleExchangeBack,
    handleExchangeContinue,
    handleExchangeVariantSelect,
  } = flow.actions
  const {
    getAvailableExchangeVariants,
    getExchangeUnitKey,
    isExchangeSelectionComplete,
  } = flow.selectors
  const isComplete = isExchangeSelectionComplete()

  return (
    <PrototypeFrame>
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-2xl tracking-wide">Select Replacement Items</h1>

        <div className="space-y-6">
          <div className="space-y-3">
            {Array.from(selectedItems.entries()).map(([itemId, qty]) => {
              const item = orderItems.find((orderItem) => orderItem.id === itemId)
              if (!item || !item.variants) return null

              const availableVariants = getAvailableExchangeVariants(item)

              return (
                <div className="rounded border-2 border-gray-200 bg-white p-4" key={itemId}>
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      alt={item.name}
                      className="h-20 w-20 rounded object-cover"
                      src={item.image}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Returning: {item.details}</p>
                      <div className="mt-1 flex items-center gap-4 text-sm">
                        <span className="text-gray-600">Qty: {qty}</span>
                        <span className="font-semibold">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                    {Array.from({ length: qty }).map((_, index) => {
                      const unitKey = getExchangeUnitKey(itemId, index)

                      return (
                        <div className="flex items-center justify-between gap-4" key={unitKey}>
                          <span className="text-sm font-medium text-gray-700">
                            Replacement {qty > 1 ? `#${index + 1}` : ''}
                          </span>
                          <Select.Root
                            value={exchangeVariants.get(unitKey) || ''}
                            onValueChange={(value) => handleExchangeVariantSelect(unitKey, value)}
                          >
                            <Select.Trigger className="flex w-[280px] items-center justify-between rounded border border-gray-300 bg-white px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 data-[placeholder]:text-gray-400">
                              <Select.Value placeholder="Select variant" />
                              <Select.Icon>
                                <ChevronDown className="text-gray-400" size={16} />
                              </Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                                <Select.Viewport className="p-1">
                                  {availableVariants.map((variant) => (
                                    <Select.Item
                                      className="cursor-pointer rounded px-4 py-2 text-sm outline-none hover:bg-gray-100 data-[highlighted]:bg-gray-100"
                                      key={variant.id}
                                      value={variant.id}
                                    >
                                      <Select.ItemText>{variant.details}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              className="flex-1 rounded border border-gray-300 py-3 transition-colors hover:bg-gray-50"
              onClick={handleExchangeBack}
            >
              Back
            </button>
            <button
              className={`flex-1 rounded py-3 transition-colors ${
                isComplete
                  ? 'cursor-pointer bg-gray-800 text-white hover:bg-gray-900'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
              disabled={!isComplete}
              onClick={handleExchangeContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </PrototypeFrame>
  )
}
