import type { ComponentType } from 'react'
import ReturnExchangeDemo from './app/App'

export interface DemoRoute {
  path: string
  title: string
  summary: string
  owner: string
  status: 'Draft' | 'Ready' | 'Archived'
  component: ComponentType
}

export const demos: DemoRoute[] = [
  {
    path: '/return-exchange',
    title: '退换货原型',
    summary: 'DTC 售后场景，覆盖订单查询、退货/换货选择、原因填写、图片上传和提交结果。',
    owner: 'DTC',
    status: 'Ready',
    component: ReturnExchangeDemo,
  },
]
