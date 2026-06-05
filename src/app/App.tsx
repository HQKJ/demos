import { useState, useRef } from 'react';
import { CircleHelp, Loader2, ChevronRight, ChevronDown, Plus, Minus, Upload, X, Search } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import { Check } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface OrderItem {
  id: string;
  name: string;
  details: string;
  image: string;
  maxQuantity: number;
  quantity: number;
  price: number;
  variants?: {
    id: string;
    size?: string;
    color?: string;
    details: string;
  }[];
}

interface ShippingAddress {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

const orderItems: OrderItem[] = [
  {
    id: 'jacket',
    name: 'Waterproof Hunting Jacket',
    details: 'Size: L, Color: Camo',
    image: 'https://images.unsplash.com/photo-1481140717212-b0124736c90a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwamFja2V0JTIwd2F0ZXJwcm9vZiUyMGNhbW98ZW58MXx8fHwxNzgwNDc2NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    maxQuantity: 2,
    quantity: 2,
    price: 129.99,
    variants: [
      { id: 'jacket-l-camo', size: 'L', color: 'Camo', details: 'Size: L, Color: Camo' },
      { id: 'jacket-l-black', size: 'L', color: 'Black', details: 'Size: L, Color: Black' },
      { id: 'jacket-xl-camo', size: 'XL', color: 'Camo', details: 'Size: XL, Color: Camo' },
      { id: 'jacket-xl-black', size: 'XL', color: 'Black', details: 'Size: XL, Color: Black' },
      { id: 'jacket-m-camo', size: 'M', color: 'Camo', details: 'Size: M, Color: Camo' },
    ],
  },
  {
    id: 'boots',
    name: 'Insulated Hunting Boots',
    details: 'Size: 10, Color: Brown',
    image: 'https://images.unsplash.com/photo-1520944105759-70085eb2ab66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwYm9vdHMlMjBpbnN1bGF0ZWR8ZW58MXx8fHwxNzgwNDc2NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    maxQuantity: 1,
    quantity: 1,
    price: 89.99,
    variants: [
      { id: 'boots-10-brown', size: '10', color: 'Brown', details: 'Size: 10, Color: Brown' },
      { id: 'boots-10-black', size: '10', color: 'Black', details: 'Size: 10, Color: Black' },
      { id: 'boots-11-brown', size: '11', color: 'Brown', details: 'Size: 11, Color: Brown' },
      { id: 'boots-9-brown', size: '9', color: 'Brown', details: 'Size: 9, Color: Brown' },
    ],
  },
];

const defaultAddress: ShippingAddress = {
  country: 'United States',
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main Street',
  apartment: 'Apt 4B',
  city: 'New York',
  state: 'California',
  zipCode: '10001',
  phone: '(555) 123-4567',
};

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

// Mock return reasons data
const returnReasons = [
  {
    id: '1',
    label: 'Product Issue',
    children: [
      {
        id: '1-1',
        label: 'Defective/Damaged',
        children: [
          { id: '1-1-1', label: 'Torn or ripped' },
          { id: '1-1-2', label: 'Stains or marks' },
          { id: '1-1-3', label: 'Hardware broken' },
        ],
      },
      {
        id: '1-2',
        label: 'Wrong Item',
        children: [
          { id: '1-2-1', label: 'Wrong color' },
          { id: '1-2-2', label: 'Wrong size' },
          { id: '1-2-3', label: 'Wrong product' },
        ],
      },
      { id: '1-3', label: 'Missing parts or accessories' },
    ],
  },
  {
    id: '2',
    label: 'Size/Fit Issue',
    children: [
      { id: '2-1', label: 'Too small' },
      { id: '2-2', label: 'Too large' },
      { id: '2-3', label: 'Uncomfortable fit' },
    ],
  },
  {
    id: '3',
    label: 'Quality Not as Expected',
    children: [
      { id: '3-1', label: 'Material quality' },
      { id: '3-2', label: 'Color different from pictures' },
      { id: '3-3', label: 'Not waterproof as described' },
    ],
  },
  {
    id: '4',
    label: 'Changed Mind',
    children: [
      { id: '4-1', label: 'No longer needed' },
      { id: '4-2', label: 'Found better alternative' },
      { id: '4-3', label: 'Ordered by mistake' },
    ],
  },
];

export default function App() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [returnType, setReturnType] = useState<'return' | 'exchange' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Map<string, number>>(new Map());
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Exchange-specific states
  const [showExchangeSelection, setShowExchangeSelection] = useState(false);
  const [exchangeVariants, setExchangeVariants] = useState<Map<string, string>>(new Map());
  const [showAddressConfirmation, setShowAddressConfirmation] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(defaultAddress);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email || !returnType) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOrderDetails(true);
    }, 1000);
  };

  const handleBack = () => {
    if (returnType === 'exchange') {
      setShowOrderDetails(false);
      setOrderNumber('');
      setEmail('');
      setReturnType('');
      setSelectedItems(new Map());
      setExchangeVariants(new Map());
    } else {
      setShowOrderDetails(false);
      setOrderNumber('');
      setEmail('');
      setReturnType('');
      setSelectedItems(new Map());
    }
  };

  const toggleItemSelection = (itemId: string) => {
    const newSelection = new Map(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.set(itemId, 1);
    }
    setSelectedItems(newSelection);
  };

  const updateItemQuantity = (itemId: string, delta: number) => {
    const newSelection = new Map(selectedItems);
    const item = orderItems.find((i) => i.id === itemId);
    if (!item) return;

    const currentQty = newSelection.get(itemId) || 1;
    const newQty = Math.max(1, Math.min(item.maxQuantity, currentQty + delta));
    newSelection.set(itemId, newQty);
    setSelectedItems(newSelection);
  };

  const handleContinue = () => {
    if (selectedItems.size > 0) {
      if (returnType === 'exchange') {
        setShowExchangeSelection(true);
      } else {
        setShowReasonDialog(true);
      }
    }
  };

  const handleExchangeVariantSelect = (itemId: string, variantId: string) => {
    const newVariants = new Map(exchangeVariants);
    newVariants.set(itemId, variantId);
    setExchangeVariants(newVariants);
  };

  const getExchangeUnitKey = (itemId: string, unitIndex: number) => `${itemId}-${unitIndex}`;

  const getAvailableExchangeVariants = (item: OrderItem) => {
    return item.variants?.filter((variant) => variant.details !== item.details) || [];
  };

  const isValidExchangeVariant = (itemId: string, variantId: string) => {
    const item = orderItems.find((i) => i.id === itemId);
    if (!item) return false;

    return getAvailableExchangeVariants(item).some((variant) => variant.id === variantId);
  };

  const isExchangeSelectionComplete = () => {
    return Array.from(selectedItems.entries()).every(([itemId, qty]) =>
      Array.from({ length: qty }).every((_, index) => {
        const variantId = exchangeVariants.get(getExchangeUnitKey(itemId, index));
        return variantId ? isValidExchangeVariant(itemId, variantId) : false;
      })
    );
  };

  const handleExchangeContinue = () => {
    if (isExchangeSelectionComplete()) {
      setShowExchangeSelection(false);
      setShowAddressConfirmation(true);
    }
  };

  const handleAddressConfirm = () => {
    setShowAddressConfirmation(false);
    setShowReasonDialog(true);
  };

  const handleExchangeBack = () => {
    if (showAddressConfirmation) {
      setShowAddressConfirmation(false);
      setShowExchangeSelection(true);
    } else {
      setShowExchangeSelection(false);
      setExchangeVariants(new Map());
    }
  };

  const getCurrentReasons = () => {
    if (selectedPath.length === 0) return returnReasons;

    let current: any = returnReasons;
    for (const id of selectedPath) {
      const found = current.find((r: any) => r.id === id);
      if (found?.children) {
        current = found.children;
      }
    }
    return current;
  };

  const getSelectedReasonPath = () => {
    const path: string[] = [];
    let current: any = returnReasons;

    for (const id of selectedPath) {
      const found = current.find((r: any) => r.id === id);
      if (found) {
        path.push(found.label);
        if (found.children) {
          current = found.children;
        }
      }
    }

    if (selectedReason) {
      path.push(selectedReason);
    }

    return path;
  };

  const handleReasonSelect = (reason: any) => {
    if (reason.children) {
      setSelectedPath([...selectedPath, reason.id]);
    } else {
      setSelectedReason(reason.label);
      setShowImageUpload(true);
    }
  };

  const handleReasonBack = () => {
    if (showImageUpload) {
      setShowImageUpload(false);
      setUploadedImages([]);
    } else if (selectedPath.length > 0) {
      setSelectedPath(selectedPath.slice(0, -1));
    } else {
      setShowReasonDialog(false);
      if (returnType === 'exchange') {
        setShowAddressConfirmation(true);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 5 - uploadedImages.length;
    const filesToAdd = files.slice(0, remainingSlots);
    setUploadedImages([...uploadedImages, ...filesToAdd]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleImageUploadComplete = () => {
    if (uploadedImages.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowReasonDialog(false);
      setShowImageUpload(false);
      setShowOrderDetails(false);
      setShowSuccess(true);
    }, 1000);
  };

  const handleStartNewReturn = () => {
    setShowSuccess(false);
    setOrderNumber('');
    setEmail('');
    setReturnType('');
    setSelectedItems(new Map());
    setSelectedPath([]);
    setSelectedReason('');
    setUploadedImages([]);
    setExchangeVariants(new Map());
    setShippingAddress(defaultAddress);
    setShowExchangeSelection(false);
    setShowAddressConfirmation(false);
  };

  if (showSuccess) {
    return (
      <Tooltip.Provider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          {/* TIDEWE Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-wider text-gray-800">TIDEWE</h1>
          </div>

          {/* Success Message */}
          <div className="w-full max-w-md text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Return Submitted Successfully!</h2>
              <p className="text-gray-600">
                Your return request has been received. We'll send you a confirmation email shortly.
              </p>
            </div>

            <button
              onClick={handleStartNewReturn}
              className="w-full py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
            >
              Start New Return
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center text-gray-600">
            <p>Questions?</p>
            <p>
              Contact{' '}
              <a
                href="mailto:support@tidewe.com"
                className="text-red-600 hover:text-red-700 underline"
              >
                support@tidewe.com
              </a>
            </p>
          </div>
        </div>
      </Tooltip.Provider>
    );
  }

  if (showAddressConfirmation) {
    return (
      <Tooltip.Provider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          {/* TIDEWE Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-wider text-gray-800">TIDEWE</h1>
          </div>

          {/* Address Confirmation */}
          <div className="w-full max-w-2xl">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded border border-gray-300">
                <h2 className="text-xl mb-6 text-gray-700">Delivery</h2>
                <div className="space-y-4">
                  {/* Country/Region */}
                  <div>
                    <Select.Root value={shippingAddress.country} onValueChange={(value) => setShippingAddress({ ...shippingAddress, country: value })}>
                      <Select.Trigger className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-xs text-gray-500">Country/Region</div>
                          <Select.Value />
                        </div>
                        <Select.Icon>
                          <ChevronDown size={20} className="text-gray-400" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                          <Select.Viewport className="p-1">
                            <Select.Item value="United States" className="px-4 py-3 cursor-pointer hover:bg-gray-100 rounded outline-none data-[highlighted]:bg-gray-100">
                              <Select.ItemText>United States</Select.ItemText>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>

                  {/* First Name and Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First name"
                      value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Address */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Address"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
                    />
                    <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>

                  {/* Apartment */}
                  <input
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={shippingAddress.apartment}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
                  />

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
                    />
                    <Select.Root value={shippingAddress.state} onValueChange={(value) => setShippingAddress({ ...shippingAddress, state: value })}>
                      <Select.Trigger className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-xs text-gray-500">State</div>
                          <Select.Value />
                        </div>
                        <Select.Icon>
                          <ChevronDown size={16} className="text-gray-400" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden max-h-60">
                          <Select.Viewport className="p-1">
                            {US_STATES.map((state) => (
                              <Select.Item key={state} value={state} className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded outline-none data-[highlighted]:bg-gray-100">
                                <Select.ItemText>{state}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                    <input
                      type="text"
                      placeholder="ZIP code"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
                    />
                    <Tooltip.Root delayDuration={200}>
                      <Tooltip.Trigger asChild>
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <CircleHelp size={20} />
                        </button>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="bg-gray-800 text-white px-3 py-2 rounded text-sm max-w-xs shadow-lg" sideOffset={5}>
                          Phone number for delivery updates
                          <Tooltip.Arrow className="fill-gray-800" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleExchangeBack}
                  className="flex-1 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleAddressConfirm}
                  className="flex-1 py-3 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center text-gray-600">
            <p>Questions?</p>
            <p>
              Contact{' '}
              <a
                href="mailto:support@tidewe.com"
                className="text-red-600 hover:text-red-700 underline"
              >
                support@tidewe.com
              </a>
            </p>
          </div>
        </div>
      </Tooltip.Provider>
    );
  }

  if (showExchangeSelection) {
    return (
      <Tooltip.Provider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          {/* TIDEWE Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-wider text-gray-800">TIDEWE</h1>
          </div>

          {/* Exchange Selection */}
          <div className="w-full max-w-2xl">
            <h1 className="text-center mb-8 text-2xl tracking-wide">Select Replacement Items</h1>

            <div className="space-y-6">
              <div>
                <div className="space-y-3">
                  {Array.from(selectedItems.entries()).map(([itemId, qty]) => {
                    const item = orderItems.find((i) => i.id === itemId);
                    if (!item || !item.variants) return null;
                    const availableVariants = getAvailableExchangeVariants(item);

                    return (
                      <div
                        key={itemId}
                        className="p-4 rounded border-2 border-gray-200 bg-white"
                      >
                        <div className="flex items-center gap-4">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
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

                        {/* Variant Selectors */}
                        <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                          {Array.from({ length: qty }).map((_, index) => {
                            const unitKey = getExchangeUnitKey(itemId, index);

                            return (
                              <div key={unitKey} className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                  Replacement {qty > 1 ? `#${index + 1}` : ''}
                                </span>
                                <Select.Root
                                  value={exchangeVariants.get(unitKey) || ''}
                                  onValueChange={(value) => handleExchangeVariantSelect(unitKey, value)}
                                >
                                  <Select.Trigger className="w-[280px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white flex items-center justify-between text-sm data-[placeholder]:text-gray-400">
                                    <Select.Value placeholder="Select variant" />
                                    <Select.Icon>
                                      <ChevronDown size={16} className="text-gray-400" />
                                    </Select.Icon>
                                  </Select.Trigger>
                                  <Select.Portal>
                                    <Select.Content className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                      <Select.Viewport className="p-1">
                                        {availableVariants.map((variant) => (
                                          <Select.Item
                                            key={variant.id}
                                            value={variant.id}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded outline-none data-[highlighted]:bg-gray-100 text-sm"
                                          >
                                            <Select.ItemText>{variant.details}</Select.ItemText>
                                          </Select.Item>
                                        ))}
                                      </Select.Viewport>
                                    </Select.Content>
                                  </Select.Portal>
                                </Select.Root>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleExchangeBack}
                  className="flex-1 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleExchangeContinue}
                  disabled={!isExchangeSelectionComplete()}
                  className={`flex-1 py-3 rounded transition-colors ${
                    isExchangeSelectionComplete()
                      ? 'bg-gray-800 text-white hover:bg-gray-900 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center text-gray-600">
            <p>Questions?</p>
            <p>
              Contact{' '}
              <a
                href="mailto:support@tidewe.com"
                className="text-red-600 hover:text-red-700 underline"
              >
                support@tidewe.com
              </a>
            </p>
          </div>
        </div>
      </Tooltip.Provider>
    );
  }

  if (showOrderDetails) {
    return (
      <Tooltip.Provider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          {/* TIDEWE Logo */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold tracking-wider text-gray-800">TIDEWE</h1>
          </div>

          {/* Order Details */}
          <div className="w-full max-w-2xl">
            <h1 className="text-center mb-8 text-2xl tracking-wide">
              Select an item or items to {returnType === 'exchange' ? 'exchange' : 'return'}
            </h1>

            <div className="space-y-6">
              {/* Items */}
              <div>
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 rounded border-2 transition-colors ${
                        selectedItems.has(item.id)
                          ? 'border-gray-800 bg-gray-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <Checkbox.Root
                        checked={selectedItems.has(item.id)}
                        onClick={() => toggleItemSelection(item.id)}
                        className="w-5 h-5 border-2 border-gray-400 rounded flex items-center justify-center data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800 cursor-pointer"
                      >
                        <Checkbox.Indicator>
                          <Check size={16} className="text-white" />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.details}</p>
                        <div className="mt-1 flex items-center gap-4 text-sm">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-semibold">${item.price.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      {selectedItems.has(item.id) && (
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-500">Return Qty</span>
                          <div className="flex items-center gap-1 border border-gray-300 rounded">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateItemQuantity(item.id, -1);
                              }}
                              disabled={(selectedItems.get(item.id) || 1) <= 1}
                              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-semibold text-sm">
                              {selectedItems.get(item.id) || 1}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateItemQuantity(item.id, 1);
                              }}
                              disabled={(selectedItems.get(item.id) || 1) >= item.maxQuantity}
                              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={selectedItems.size === 0}
                  className={`flex-1 py-3 rounded transition-colors ${
                    selectedItems.size > 0
                      ? 'bg-gray-800 text-white hover:bg-gray-900 cursor-pointer'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 text-center text-gray-600">
            <p>Questions?</p>
            <p>
              Contact{' '}
              <a
                href="mailto:support@tidewe.com"
                className="text-red-600 hover:text-red-700 underline"
              >
                support@tidewe.com
              </a>
            </p>
          </div>

          {/* Return Reason Dialog */}
          <Dialog.Root open={showReasonDialog} onOpenChange={setShowReasonDialog}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
              <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <Dialog.Title className="text-xl font-semibold p-6 border-b text-center">
                  Select Return Reason
                </Dialog.Title>

                <div className="flex flex-1 overflow-hidden">
                  {/* Left Side - Selected Items */}
                  <div className="w-1/3 border-r bg-gray-50 p-6 overflow-y-auto">
                    <h3 className="font-semibold mb-4 text-gray-700">Selected Items</h3>
                    <div className="space-y-3">
                      {Array.from(selectedItems.entries()).map(([itemId, qty]) => {
                        const item = orderItems.find((i) => i.id === itemId);
                        if (!item) return null;
                        return (
                          <div key={itemId} className="bg-white p-3 rounded border border-gray-200">
                            <div className="flex gap-3">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{item.name}</p>
                                <p className="text-xs text-gray-600">{item.details}</p>
                                <p className="text-xs text-gray-600 mt-1">Return Qty: {qty}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Side - Return Reasons or Image Upload */}
                  <div className="flex-1 p-6 overflow-y-auto flex flex-col">
                    {/* Selected Reason Path */}
                    {getSelectedReasonPath().length > 0 && (
                      <div className="mb-4 pb-4 border-b">
                        <p className="text-xs text-gray-500 mb-1">Selected Reason:</p>
                        <div className="flex items-center gap-2 text-sm">
                          {getSelectedReasonPath().map((label, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="font-medium text-gray-700">{label}</span>
                              {index < getSelectedReasonPath().length - 1 && (
                                <ChevronRight size={14} className="text-gray-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!showImageUpload ? (
                      <div className="flex-1">
                        <h3 className="font-semibold mb-4 text-gray-700">Reason</h3>
                        <div className="space-y-2">
                          {getCurrentReasons().map((reason: any) => (
                            <button
                              key={reason.id}
                              onClick={() => handleReasonSelect(reason)}
                              className="w-full flex items-center justify-between p-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-left"
                            >
                              <span className="font-medium">{reason.label}</span>
                              {reason.children && <ChevronRight size={20} className="text-gray-400" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-gray-700">Upload Images</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Please upload images (Required, max 5 images)
                        </p>

                        {/* Upload Area */}
                        <div className="space-y-4">
                          {uploadedImages.length < 5 && (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                            >
                              <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600">
                                Click to upload images
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {uploadedImages.length} / 5 images uploaded
                              </p>
                            </div>
                          )}

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                          />

                          {/* Image Preview Grid */}
                          {uploadedImages.length > 0 && (
                            <div className="grid grid-cols-2 gap-3">
                              {uploadedImages.map((file, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-32 object-cover rounded border border-gray-300"
                                  />
                                  <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 border-t">
                  {showImageUpload ? (
                    <div className="flex gap-3">
                      <button
                        onClick={handleReasonBack}
                        className="flex-1 py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleImageUploadComplete}
                        disabled={uploadedImages.length === 0 || isSubmitting}
                        className={`flex-1 py-3 rounded transition-colors flex items-center justify-center ${
                          uploadedImages.length > 0 && !isSubmitting
                            ? 'bg-gray-800 text-white hover:bg-gray-900 cursor-pointer'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin mr-2" size={20} />
                            Submitting...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleReasonBack}
                      className="w-full py-3 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      {selectedPath.length > 0 ? 'Back' : 'Cancel'}
                    </button>
                  )}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Tooltip.Provider>
    );
  }

  return (
    <Tooltip.Provider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* TIDEWE Logo */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold tracking-wider text-gray-800">TIDEWE</h1>
      </div>

      {/* Return Form Card */}
      <div className="bg-white rounded-lg shadow-md p-12 w-full max-w-md">
        <h1 className="text-center mb-8 text-2xl tracking-wide">START A RETURN</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Order Number Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Order number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <Tooltip.Root delayDuration={200}>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Help"
                >
                  <CircleHelp size={20} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-gray-800 text-white px-3 py-2 rounded text-sm max-w-xs shadow-lg"
                  sideOffset={5}
                >
                  Your order number can be found in your order confirmation email.
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              required
            />
          </div>

          {/* Return Type Selection */}
          <div>
            <Select.Root value={returnType} onValueChange={(value) => setReturnType(value as 'return' | 'exchange')}>
              <Select.Trigger className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white flex items-center justify-between text-gray-700 data-[placeholder]:text-gray-400">
                <Select.Value placeholder="Select return or exchange" />
                <Select.Icon>
                  <ChevronDown size={20} className="text-gray-400" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  <Select.Viewport className="p-1">
                    <Select.Item
                      value="return"
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 rounded outline-none data-[highlighted]:bg-gray-100"
                    >
                      <Select.ItemText>Return</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="exchange"
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 rounded outline-none data-[highlighted]:bg-gray-100"
                    >
                      <Select.ItemText>Exchange</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          {/* Get Started Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!orderNumber || !email || !returnType || isLoading}
              className={`w-full py-3 rounded transition-colors flex items-center justify-center ${
                orderNumber && email && returnType && !isLoading
                  ? 'bg-gray-800 text-white hover:bg-gray-900 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Loading...
                </>
              ) : (
                'Get started'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Contact Information */}
      <div className="mt-8 text-center text-gray-600">
        <p>Questions?</p>
        <p>
          Contact{' '}
          <a
            href="mailto:support@tidewe.com"
            className="text-red-600 hover:text-red-700 underline"
          >
            support@tidewe.com
          </a>
        </p>
      </div>
    </div>
    </Tooltip.Provider>
  );
}
