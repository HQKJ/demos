import { ChevronRight, Loader2, Upload, X } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { orderItems } from '../data'
import { ImageWithFallback } from '../../../shared/components/ImageWithFallback'
import type { ReturnExchangeFlow } from '../types'

interface ReturnReasonDialogProps {
  flow: ReturnExchangeFlow
}

export function ReturnReasonDialog({ flow }: ReturnReasonDialogProps) {
  const {
    isSubmitting,
    selectedItems,
    selectedPath,
    showImageUpload,
    showReasonDialog,
    uploadedImages,
  } = flow.state
  const {
    handleImageUpload,
    handleImageUploadComplete,
    handleReasonBack,
    handleReasonSelect,
    removeImage,
    setShowReasonDialog,
  } = flow.actions
  const { fileInputRef } = flow.refs
  const { getCurrentReasons, getSelectedReasonPath } = flow.selectors
  const selectedReasonPath = getSelectedReasonPath()

  return (
    <Dialog.Root open={showReasonDialog} onOpenChange={setShowReasonDialog}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 flex max-h-[80vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-white shadow-xl">
          <Dialog.Title className="border-b p-6 text-center text-xl font-semibold">
            Select Return Reason
          </Dialog.Title>

          <div className="flex flex-1 overflow-hidden">
            <SelectedItemsPanel selectedItems={selectedItems} />

            <div className="flex flex-1 flex-col overflow-y-auto p-6">
              {selectedReasonPath.length > 0 && (
                <div className="mb-4 border-b pb-4">
                  <p className="mb-1 text-xs text-gray-500">Selected Reason:</p>
                  <div className="flex items-center gap-2 text-sm">
                    {selectedReasonPath.map((label, index) => (
                      <div className="flex items-center gap-2" key={`${label}-${index}`}>
                        <span className="font-medium text-gray-700">{label}</span>
                        {index < selectedReasonPath.length - 1 && (
                          <ChevronRight className="text-gray-400" size={14} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!showImageUpload ? (
                <div className="flex-1">
                  <h3 className="mb-4 font-semibold text-gray-700">Reason</h3>
                  <div className="space-y-2">
                    {getCurrentReasons().map((reason) => (
                      <button
                        className="flex w-full items-center justify-between rounded border border-gray-300 p-4 text-left transition-colors hover:bg-gray-50"
                        key={reason.id}
                        onClick={() => handleReasonSelect(reason)}
                      >
                        <span className="font-medium">{reason.label}</span>
                        {reason.children && <ChevronRight className="text-gray-400" size={20} />}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ImageUploadPanel
                  fileInputRef={fileInputRef}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={removeImage}
                  uploadedImages={uploadedImages}
                />
              )}
            </div>
          </div>

          <div className="border-t p-6">
            {showImageUpload ? (
              <div className="flex gap-3">
                <button
                  className="flex-1 rounded border border-gray-300 py-3 transition-colors hover:bg-gray-50"
                  onClick={handleReasonBack}
                >
                  Back
                </button>
                <button
                  className={`flex flex-1 items-center justify-center rounded py-3 transition-colors ${
                    uploadedImages.length > 0 && !isSubmitting
                      ? 'cursor-pointer bg-gray-800 text-white hover:bg-gray-900'
                      : 'cursor-not-allowed bg-gray-100 text-gray-400'
                  }`}
                  disabled={uploadedImages.length === 0 || isSubmitting}
                  onClick={handleImageUploadComplete}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            ) : (
              <button
                className="w-full rounded border border-gray-300 py-3 transition-colors hover:bg-gray-50"
                onClick={handleReasonBack}
              >
                {selectedPath.length > 0 ? 'Back' : 'Cancel'}
              </button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

interface SelectedItemsPanelProps {
  selectedItems: Map<string, number>
}

function SelectedItemsPanel({ selectedItems }: SelectedItemsPanelProps) {
  return (
    <div className="w-1/3 overflow-y-auto border-r bg-gray-50 p-6">
      <h3 className="mb-4 font-semibold text-gray-700">Selected Items</h3>
      <div className="space-y-3">
        {Array.from(selectedItems.entries()).map(([itemId, qty]) => {
          const item = orderItems.find((orderItem) => orderItem.id === itemId)
          if (!item) return null

          return (
            <div className="rounded border border-gray-200 bg-white p-3" key={itemId}>
              <div className="flex gap-3">
                <ImageWithFallback
                  alt={item.name}
                  className="h-16 w-16 rounded object-cover"
                  src={item.image}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-600">{item.details}</p>
                  <p className="mt-1 text-xs text-gray-600">Return Qty: {qty}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ImageUploadPanelProps {
  fileInputRef: React.RefObject<HTMLInputElement>
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: (index: number) => void
  uploadedImages: File[]
}

function ImageUploadPanel({
  fileInputRef,
  onImageUpload,
  onRemoveImage,
  uploadedImages,
}: ImageUploadPanelProps) {
  return (
    <div className="flex-1">
      <h3 className="mb-2 font-semibold text-gray-700">Upload Images</h3>
      <p className="mb-4 text-sm text-gray-600">Please upload images (Required, max 5 images)</p>

      <div className="space-y-4">
        {uploadedImages.length < 5 && (
          <div
            className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-gray-400 hover:bg-gray-50"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto mb-2 text-gray-400" size={40} />
            <p className="text-sm text-gray-600">Click to upload images</p>
            <p className="mt-1 text-xs text-gray-500">
              {uploadedImages.length} / 5 images uploaded
            </p>
          </div>
        )}

        <input
          accept="image/*"
          className="hidden"
          multiple
          onChange={onImageUpload}
          ref={fileInputRef}
          type="file"
        />

        {uploadedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {uploadedImages.map((file, index) => (
              <div className="group relative" key={`${file.name}-${index}`}>
                <img
                  alt={`Upload ${index + 1}`}
                  className="h-32 w-full rounded border border-gray-300 object-cover"
                  src={URL.createObjectURL(file)}
                />
                <button
                  className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => onRemoveImage(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
