import { lazy } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'

export interface DemoRoute {
  path: string
  title: string
  summary: string
  owner: string
  status: 'Draft' | 'Ready' | 'Archived'
  component: LazyExoticComponent<ComponentType>
  help?: () => Promise<{ default: string }>
}

export const demos: DemoRoute[] = [
  {
    path: '/return-exchange',
    title: '退换货原型',
    summary:
      'DTC 售后场景，覆盖订单查询、退货/换货选择、原因填写、图片上传和提交结果。',
    owner: 'DTC',
    status: 'Ready',
    component: lazy(() => import('../../demos/return-exchange')),
    help: () => import('../../demos/return-exchange/help.md?raw'),
  },
]
