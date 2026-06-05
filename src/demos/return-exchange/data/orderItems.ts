import type { OrderItem } from '../types'

export const orderItems: OrderItem[] = [
  {
    id: 'jacket-l-camo-line',
    name: 'Waterproof Hunting Jacket',
    details: 'Size: L, Color: Camo',
    image:
      'https://images.unsplash.com/photo-1481140717212-b0124736c90a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwamFja2V0JTIwd2F0ZXJwcm9vZiUyMGNhbW98ZW58MXx8fHwxNzgwNDc2NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
    id: 'jacket-xl-black-line',
    name: 'Waterproof Hunting Jacket',
    details: 'Size: XL, Color: Black',
    image:
      'https://images.unsplash.com/photo-1481140717212-b0124736c90a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwamFja2V0JTIwd2F0ZXJwcm9vZiUyMGNhbW98ZW58MXx8fHwxNzgwNDc2NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    maxQuantity: 1,
    quantity: 1,
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
    id: 'gloves-moss-line',
    name: 'Cold Weather Hunting Gloves',
    details: 'Size: M, Color: Moss',
    image:
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    maxQuantity: 3,
    quantity: 3,
    price: 34.99,
    variants: [
      { id: 'gloves-m-moss', size: 'M', color: 'Moss', details: 'Size: M, Color: Moss' },
      { id: 'gloves-m-black', size: 'M', color: 'Black', details: 'Size: M, Color: Black' },
      { id: 'gloves-l-moss', size: 'L', color: 'Moss', details: 'Size: L, Color: Moss' },
      { id: 'gloves-l-black', size: 'L', color: 'Black', details: 'Size: L, Color: Black' },
    ],
  },
  {
    id: 'boots',
    name: 'Insulated Hunting Boots',
    details: 'Size: 10, Color: Brown',
    image:
      'https://images.unsplash.com/photo-1520944105759-70085eb2ab66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW50aW5nJTIwYm9vdHMlMjBpbnN1bGF0ZWR8ZW58MXx8fHwxNzgwNDc2NjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
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
]
