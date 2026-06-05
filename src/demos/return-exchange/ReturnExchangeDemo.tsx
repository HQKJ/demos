import * as Tooltip from '@radix-ui/react-tooltip'
import { useReturnExchangeFlow } from './hooks/useReturnExchangeFlow'
import { AddressConfirmationPage } from './pages/AddressConfirmationPage'
import { ExchangeSelectionPage } from './pages/ExchangeSelectionPage'
import { OrderDetailsPage } from './pages/OrderDetailsPage'
import { StartReturnPage } from './pages/StartReturnPage'
import { SuccessPage } from './pages/SuccessPage'
import type { ReturnExchangeFlow } from './types'

export default function ReturnExchangeDemo() {
  const flow = useReturnExchangeFlow() as ReturnExchangeFlow
  const { showAddressConfirmation, showExchangeSelection, showOrderDetails, showSuccess } =
    flow.state

  return (
    <Tooltip.Provider>
      {showSuccess ? (
        <SuccessPage flow={flow} />
      ) : showAddressConfirmation ? (
        <AddressConfirmationPage flow={flow} />
      ) : showExchangeSelection ? (
        <ExchangeSelectionPage flow={flow} />
      ) : showOrderDetails ? (
        <OrderDetailsPage flow={flow} />
      ) : (
        <StartReturnPage flow={flow} />
      )}
    </Tooltip.Provider>
  )
}
