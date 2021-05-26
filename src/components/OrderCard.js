import React from 'react'

import NumberFormat from 'react-number-format';

import '../styles/components/OrderCard.scss'

const OrderCard = ({order}) => {
  let sum = 0
  order.products.forEach(element => sum += element.quantity * element.price );
  return (
    <div className="card-wrapper">
      <div className="card-container">
        <div className="card-container_info">
          <div className="card-container_info-name">
            <span>{order.name}</span>{' '}
            <span>{order.lastname}</span>
          </div>
          <div className="card-container_info-address">{order.address}</div>
          <div className="card-container_info-summary">
            <span>{order.products[0].name} <strong>x{order.products[0].quantity}...</strong></span>
          </div>
        </div>
        <div className="card-container_status">
          <div>
            <div>
              <h3>Total</h3>
              <NumberFormat
                value={sum}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </div>
          </div>
          <div>
            <div>
              <h3>Estado</h3>
              <span>{order.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderCard
