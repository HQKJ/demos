import type { ReturnReason } from '../types'

export const returnReasons: ReturnReason[] = [
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
]
