import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { defaultAddress, orderItems, returnReasons } from '../data'
import type { OrderItem, ProductVariant, ReturnReason, ReturnType, ShippingAddress } from '../types'

export function useReturnExchangeFlow() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [returnType, setReturnType] = useState<ReturnType>('')
  const [isLoading, setIsLoading] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map())
  const [showReasonDialog, setShowReasonDialog] = useState(false)
  const [selectedPath, setSelectedPath] = useState<string[]>([])
  const [selectedReason, setSelectedReason] = useState('')
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showExchangeSelection, setShowExchangeSelection] = useState(false)
  const [exchangeVariants, setExchangeVariants] = useState<Map<string, string>>(new Map())
  const [showAddressConfirmation, setShowAddressConfirmation] =
    useState(false)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(defaultAddress)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetOrderLookup = () => {
    setShowOrderDetails(false)
    setOrderNumber('')
    setEmail('')
    setReturnType('')
    setSelectedItems(new Map())
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!orderNumber || !email || !returnType) return

    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setShowOrderDetails(true)
    }, 1000)
  }

  const handleBack = () => {
    resetOrderLookup()
    setExchangeVariants(new Map())
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((currentSelection) => {
      const nextSelection = new Map(currentSelection)

      if (nextSelection.has(itemId)) {
        nextSelection.delete(itemId)
      } else {
        nextSelection.set(itemId, 1)
      }

      return nextSelection
    })
  }

  const updateItemQuantity = (itemId: string, delta: number) => {
    const item = orderItems.find((orderItem) => orderItem.id === itemId)
    if (!item) return

    setSelectedItems((currentSelection) => {
      const nextSelection = new Map(currentSelection)
      const currentQty = nextSelection.get(itemId) || 1
      const newQty = Math.max(1, Math.min(item.maxQuantity, currentQty + delta))
      nextSelection.set(itemId, newQty)
      return nextSelection
    })
  }

  const handleContinue = () => {
    if (selectedItems.size === 0) return

    if (returnType === 'exchange') {
      setShowExchangeSelection(true)
    } else {
      setShowReasonDialog(true)
    }
  }

  const handleExchangeVariantSelect = (unitKey: string, variantId: string) => {
    setExchangeVariants((currentVariants) => {
      const nextVariants = new Map(currentVariants)
      nextVariants.set(unitKey, variantId)
      return nextVariants
    })
  }

  const getExchangeUnitKey = (itemId: string, unitIndex: number) => `${itemId}-${unitIndex}`

  const getAvailableExchangeVariants = (item: OrderItem): ProductVariant[] =>
    item.variants?.filter((variant) => variant.details !== item.details) || []

  const isValidExchangeVariant = (itemId: string, variantId: string) => {
    const item = orderItems.find((orderItem) => orderItem.id === itemId)
    if (!item) return false

    return getAvailableExchangeVariants(item).some((variant) => variant.id === variantId)
  }

  const isExchangeSelectionComplete = () =>
    Array.from(selectedItems.entries()).every(([itemId, qty]) =>
      Array.from({ length: qty }).every((_, index) => {
        const variantId = exchangeVariants.get(getExchangeUnitKey(itemId, index))
        return variantId ? isValidExchangeVariant(itemId, variantId) : false
      }),
    )

  const handleExchangeContinue = () => {
    if (isExchangeSelectionComplete()) {
      setShowExchangeSelection(false)
      setShowAddressConfirmation(true)
    }
  }

  const handleAddressConfirm = () => {
    setShowAddressConfirmation(false)
    setShowReasonDialog(true)
  }

  const handleExchangeBack = () => {
    if (showAddressConfirmation) {
      setShowAddressConfirmation(false)
      setShowExchangeSelection(true)
      return
    }

    setShowExchangeSelection(false)
    setExchangeVariants(new Map())
  }

  const getCurrentReasons = (): ReturnReason[] => {
    let currentReasons = returnReasons

    for (const id of selectedPath) {
      const found = currentReasons.find((reason) => reason.id === id)
      if (found?.children) {
        currentReasons = found.children
      }
    }

    return currentReasons
  }

  const getSelectedReasonPath = () => {
    const path: string[] = []
    let currentReasons = returnReasons

    for (const id of selectedPath) {
      const found = currentReasons.find((reason) => reason.id === id)
      if (found) {
        path.push(found.label)
        if (found.children) {
          currentReasons = found.children
        }
      }
    }

    if (selectedReason) {
      path.push(selectedReason)
    }

    return path
  }

  const handleReasonSelect = (reason: ReturnReason) => {
    if (reason.children) {
      setSelectedPath((path) => [...path, reason.id])
      return
    }

    setSelectedReason(reason.label)
    setShowImageUpload(true)
  }

  const handleReasonBack = () => {
    if (showImageUpload) {
      setShowImageUpload(false)
      setUploadedImages([])
      return
    }

    if (selectedPath.length > 0) {
      setSelectedPath((path) => path.slice(0, -1))
      return
    }

    setShowReasonDialog(false)
    if (returnType === 'exchange') {
      setShowAddressConfirmation(true)
    }
  }

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const remainingSlots = 5 - uploadedImages.length
    const filesToAdd = files.slice(0, remainingSlots)
    setUploadedImages((images) => [...images, ...filesToAdd])
  }

  const removeImage = (index: number) => {
    setUploadedImages((images) => images.filter((_, imageIndex) => imageIndex !== index))
  }

  const handleImageUploadComplete = () => {
    if (uploadedImages.length === 0) return

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setShowReasonDialog(false)
      setShowImageUpload(false)
      setShowOrderDetails(false)
      setShowSuccess(true)
    }, 1000)
  }

  const handleStartNewReturn = () => {
    setShowSuccess(false)
    setOrderNumber('')
    setEmail('')
    setReturnType('')
    setSelectedItems(new Map())
    setSelectedPath([])
    setSelectedReason('')
    setUploadedImages([])
    setExchangeVariants(new Map())
    setShippingAddress(defaultAddress)
    setShowExchangeSelection(false)
    setShowAddressConfirmation(false)
  }

  return {
    state: {
      orderNumber,
      email,
      returnType,
      isLoading,
      showOrderDetails,
      selectedItems,
      showReasonDialog,
      selectedPath,
      selectedReason,
      showImageUpload,
      uploadedImages,
      isSubmitting,
      showSuccess,
      showExchangeSelection,
      exchangeVariants,
      showAddressConfirmation,
      shippingAddress,
    },
    refs: {
      fileInputRef,
    },
    actions: {
      setOrderNumber,
      setEmail,
      setReturnType,
      setShowReasonDialog,
      setShippingAddress,
      handleSubmit,
      handleBack,
      toggleItemSelection,
      updateItemQuantity,
      handleContinue,
      handleExchangeVariantSelect,
      handleExchangeContinue,
      handleAddressConfirm,
      handleExchangeBack,
      handleReasonSelect,
      handleReasonBack,
      handleImageUpload,
      removeImage,
      handleImageUploadComplete,
      handleStartNewReturn,
    },
    selectors: {
      getExchangeUnitKey,
      getAvailableExchangeVariants,
      isExchangeSelectionComplete,
      getCurrentReasons,
      getSelectedReasonPath,
    },
  }
}
