import type { ChangeEvent, FormEvent, RefObject } from 'react'

export type ReturnType = 'return' | 'exchange' | ''

export interface ProductVariant {
  id: string
  size?: string
  color?: string
  details: string
}

export interface OrderItem {
  id: string
  name: string
  details: string
  image: string
  maxQuantity: number
  quantity: number
  price: number
  variants?: ProductVariant[]
}

export interface ShippingAddress {
  country: string
  firstName: string
  lastName: string
  address: string
  apartment: string
  city: string
  state: string
  zipCode: string
  phone: string
}

export interface ReturnReason {
  id: string
  label: string
  children?: ReturnReason[]
}

export interface ReturnExchangeFlow {
  state: {
    orderNumber: string
    email: string
    returnType: ReturnType
    isLoading: boolean
    showOrderDetails: boolean
    selectedItems: Map<string, number>
    showReasonDialog: boolean
    selectedPath: string[]
    selectedReason: string
    showImageUpload: boolean
    uploadedImages: File[]
    isSubmitting: boolean
    showSuccess: boolean
    showExchangeSelection: boolean
    exchangeVariants: Map<string, string>
    showAddressConfirmation: boolean
    shippingAddress: ShippingAddress
  }
  refs: {
    fileInputRef: RefObject<HTMLInputElement>
  }
  actions: {
    setOrderNumber: (value: string) => void
    setEmail: (value: string) => void
    setReturnType: (value: ReturnType) => void
    setShowReasonDialog: (value: boolean) => void
    setShippingAddress: (value: ShippingAddress) => void
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void
    handleBack: () => void
    toggleItemSelection: (itemId: string) => void
    updateItemQuantity: (itemId: string, delta: number) => void
    handleContinue: () => void
    handleExchangeVariantSelect: (unitKey: string, variantId: string) => void
    handleExchangeContinue: () => void
    handleAddressConfirm: () => void
    handleExchangeBack: () => void
    handleReasonSelect: (reason: ReturnReason) => void
    handleReasonBack: () => void
    handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void
    removeImage: (index: number) => void
    handleImageUploadComplete: () => void
    handleStartNewReturn: () => void
  }
  selectors: {
    getExchangeUnitKey: (itemId: string, unitIndex: number) => string
    getAvailableExchangeVariants: (item: OrderItem) => ProductVariant[]
    isExchangeSelectionComplete: () => boolean
    getCurrentReasons: () => ReturnReason[]
    getSelectedReasonPath: () => string[]
  }
}
