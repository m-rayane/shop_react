import '../../../utils/styles/account.scss'

import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../utils/Context'

import CartDetails from '../cartDetails'
import { OrderDetail } from '../../molecules/orderDetail'

export default function Orders({
  className,
  orders,
  setShowDetails,
  showDetails,
}) {
  const { getOrderDetailByOrder, orderDetailByOrder, orderDetailByUser } =
    useContext(Context)

  const [targetOrder, setTargetOrder] = useState('')

  useEffect(() => {
    if (targetOrder) {
      getOrderDetailByOrder(targetOrder)
    }
  }, [targetOrder])

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  }

  return (
    <div className={className}>
      <h2>vos commandes</h2>
      <div className={`${className}__table`}>
        <table>
          <thead>
            <tr>
              <th>Numéro de commande</th>
              <th>Date</th>
              <th>Prix total</th>
              <th>statut</th>
            </tr>
          </thead>
          {orders.map((order) => {
            const date = new Date(order.createdDate)
            return (
              <>
                <tbody
                  style={{
                    background:
                      targetOrder === order.id
                        ? 'rgba(254, 209, 55, 0.1)'
                        : 'white',
                  }}
                >
                  <tr
                    key={order.id}
                    onClick={() => {
                      setShowDetails(true)
                      setTargetOrder(targetOrder !== order.id ? order.id : '')
                    }}
                  >
                    <td>
                      <h2>{order.id}</h2>
                    </td>
                    <td>{date.toLocaleString('fr-FR', options)}</td>
                    <td>{order.totalPrice} €</td>
                    <td>{order.status}</td>
                  </tr>
                </tbody>
                {showDetails &&
                  orderDetailByUser &&
                  targetOrder === order.id && (
                    <>
                      <tr
                        style={{
                          background:
                            targetOrder === order.id
                              ? 'rgba(254, 209, 55, 0.1)'
                              : 'white',
                        }}
                      >
                        <td
                          colSpan="4"
                          className={`${className}__table__shippingAddress`}
                        >
                          <div
                            className={`${className}__table__shippingAddress`}
                          >
                            <h3>Adresse de livraison</h3>
                            <div>
                              {order.shippingName} - {order.shippingAddress}
                              {' - '}0{order.shippingPhone}
                            </div>
                          </div>
                          <CartDetails
                            cartData={orderDetailByOrder}
                            className={`${className}__table__cartDetails`}
                          />
                          <div className={`${className}__table__statusBar`}>
                            <div
                              className={`${className}__table__statusBar__statusStep ${
                                order.status === 'en attente de validation'
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              En attente
                            </div>
                            <div
                              className={`${className}__table__statusBar__statusStep ${
                                order.status === 'Validé' ? 'active' : ''
                              }`}
                            >
                              Validé
                            </div>
                            <div
                              className={`${className}__table__statusBar__statusStep ${
                                order.status === 'En préparation'
                                  ? 'active'
                                  : ''
                              }`}
                            >
                              En préparation
                            </div>
                            <div
                              className={`${className}__table__statusBar__statusStep ${
                                order.status === 'Expédiée' ? 'active' : ''
                              }`}
                            >
                              Expédiée
                            </div>
                            <div
                              className={`${className}__table__statusBar__statusStep ${
                                order.status === 'Livrée' ? 'active' : ''
                              }`}
                            >
                              Livrée
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
              </>
            )
          })}
        </table>
      </div>
    </div>
  )
}
