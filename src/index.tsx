import React, { type ButtonHTMLAttributes, Component } from 'react'

/** Models */
import { type MessageData } from './models/message-data.model'

/** CSS */
import './css/button.css'

/** Root Object */
import { Commerce } from './commerce'

interface Props {
  styled: boolean
  checkoutId?: string
  chargeId?: string
  customMetadata?: string
  onLoad?: () => void
  onChargeSuccess?: (data: MessageData) => void
  onChargeFailure?: (data: MessageData) => void
  onPaymentDetected?: (data: MessageData) => void
  onModalClosed?: () => void
  disableCaching: boolean
  wrapperStyle?: Record<string, number | string>
}

interface State {
  showModal: boolean
}

export class CoinbaseCommerceButton extends Component<Props & ButtonHTMLAttributes<any>, State> {
  static defaultProps = {
    styled: false,
    disableCaching: false
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      showModal: false
    }
  }

  private onClick (): void {
    this.setState({ showModal: true })
  }

  private onModalClose (): void {
    const { onModalClosed } = this.props

    this.setState({ showModal: false })
    if (onModalClosed != null) {
      onModalClosed()
    }
  }

  private handleError (data: MessageData): void {
    console.error(data)
    this.onModalClose()
  }

  render (): JSX.Element {
    const { showModal } = this.state
    const {
      onLoad,
      onChargeSuccess,
      onChargeFailure,
      checkoutId,
      chargeId,
      customMetadata,
      onPaymentDetected,
      disableCaching,
      wrapperStyle
    } = this.props
    const CommerceProps = {
      onLoad,
      onChargeSuccess,
      onChargeFailure,
      checkoutId,
      chargeId,
      onPaymentDetected,
      disableCaching
    }

    return (
      <div style={wrapperStyle}>
        {showModal ? (
          <Commerce
            {...CommerceProps}
            onModalClose={() => { this.onModalClose() }}
            onError={(data: MessageData) => { this.handleError(data) }}
            customMetadata={customMetadata}
          />
        )
        : (
          <input type="button" onClick={()=>this.onClick()} />
        )}
      </div>
    )
  }
}
