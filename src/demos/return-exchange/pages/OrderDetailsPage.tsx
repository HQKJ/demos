import { Check, Minus, Plus } from 'lucide-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { orderItems } from '../data'
import { ImageWithFallback } from '../../../shared/components/ImageWithFallback'
import type { ReturnExchangeFlow } from '../types'
import { PrototypeFrame } from '../components/PrototypeFrame'
import { ReturnReasonDialog } from '../components/ReturnReasonDialog'

interface OrderDetailsPageProps {
  flow: ReturnExchangeFlow
}

export function OrderDetailsPage({ flow }: OrderDetailsPageProps) {
  const { returnType, selectedItems } = flow.state
  const { handleBack, handleContinue, toggleItemSelection, updateItemQuantity } = flow.actions

  return (
    <PrototypeFrame>
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-center text-2xl tracking-wide">
          Select an item or items to {returnType === 'exchange' ? 'exchange' : 'return'}
        </h1>

        <div className="space-y-6">
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div
                className={`flex items-center gap-4 rounded border-2 p-4 transition-colors ${
                  selectedItems.has(item.id)
                    ? 'border-gray-800 bg-gray-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                key={item.id}
              >
                <Checkbox.Root
                  checked={selectedItems.has(item.id)}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 border-gray-400 data-[state=checked]:border-gray-800 data-[state=checked]:bg-gray-800"
                  onClick={() => toggleItemSelection(item.id)}
                >
                  <Checkbox.Indicator>
                    <Check className="text-white" size={16} />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <ImageWithFallback
                  alt={item.name}
                  className="h-20 w-20 rounded object-cover"
                  src={item.image}
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.details}</p>
                  <div className="mt-1 flex items-center gap-4 text-sm">
                    <span className="text-gray-600">Qty: {item.quantity}</span>
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                {selectedItems.has(item.id) && (
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-gray-500">Return Qty</span>
                    <div className="flex items-center gap-1 rounded border border-gray-300">
                      <button
                        className="p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={(selectedItems.get(item.id) || 1) <= 1}
                        onClick={(event) => {
                          event.stopPropagation()
                          updateItemQuantity(item.id, -1)
                        }}
                        type="button"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {selectedItems.get(item.id) || 1}
                      </span>
                      <button
                        className="p-1.5 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={(selectedItems.get(item.id) || 1) >= item.maxQuantity}
                        onClick={(event) => {
                          event.stopPropagation()
                          updateItemQuantity(item.id, 1)
                        }}
                        type="button"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              className="flex-1 rounded border border-gray-300 py-3 transition-colors hover:bg-gray-50"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className={`flex-1 rounded py-3 transition-colors ${
                selectedItems.size > 0
                  ? 'cursor-pointer bg-gray-800 text-white hover:bg-gray-900'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
              disabled={selectedItems.size === 0}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <ReturnReasonDialog flow={flow} />
    </PrototypeFrame>
  )
}
