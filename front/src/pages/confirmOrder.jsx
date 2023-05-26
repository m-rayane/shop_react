import '../utils/styles/confirmOrder.scss'

import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import CartDetails from '../components/organisms/cartDetails'
import Summary from '../components/organisms/summary'

import { Context } from '../utils/Context'

export default function ConfirmOrder() {
  const {
    userData,
    getOrderDetailByOrder,
    orderDetailByOrder,
    ordersByUser,
    getOrdersByUser,
    productsData,
    selectedShippingAddress,
    setCartData,
  } = useContext(Context)
  const [order, setOrder] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const { orderId } = useParams()

  useEffect(() => {
    getOrderDetailByOrder(orderId)
    getOrdersByUser(userData.id)
    setOrder(ordersByUser.find((o) => o._id === orderId))
  }, [orderId, ordersByUser, userData])

  useEffect(() => {
    let totalPrice = 0
    if (orderDetailByOrder) {
      orderDetailByOrder.forEach((item) => {
        const productData = productsData.find((p) => p._id === item.productId)
        if (productData) {
          totalPrice += productData._price * item.quantity
        }
      })
    }
    setTotalPrice(totalPrice)
  }, [orderDetailByOrder, productsData])

  return (
    <div className="confirmOrder">
      <h1>{`Bravo ! Votre commande n°${orderId} est confirmée`}</h1>
      <section className="confirmOrder__info">
        <div className="confirmOrder__info__cart">
          <CartDetails
            className="confirmOrder__info__cart__cartDetails"
            cartData={orderDetailByOrder}
          />
        </div>
        <Summary
          className="confirmOrder__info__summary"
          totalPrice={totalPrice}
        />
      </section>
      <section className="confirmOrder__shippingInfo">
        <h2>Adresse de livraison</h2>
        {order && (
          <div className="confirmOrder__shippingInfo__address">
            firstName: selectedShippingAddress.firstName, lastName:
            selectedShippingAddress.lastName, phoneNumber:
            selectedShippingAddress.phoneNumber, address:
            selectedShippingAddress.address, zipCode:
            selectedShippingAddress.zipCode, city: selectedShippingAddress.city,
            <p>
              {selectedShippingAddress.firstName}{' '}
              {selectedShippingAddress.lastName}
            </p>
            <p>
              {selectedShippingAddress.address},{' '}
              {selectedShippingAddress.zipCode} {selectedShippingAddress.city}
            </p>
            <p>0{selectedShippingAddress._shippingPhone}</p>
          </div>
        )}
      </section>
      <section className="confirmOrder__additional">
        <h2>Informations supplémentaires</h2>
        <p>
          Votre commande sera expédiée dans les 48 heures et vous sera livrée
          sous 3 à 5 jours ouvrables.
        </p>
      </section>
      <footer>
        <p>Merci d'avoir choisi JOVIVE.FR !</p>
      </footer>
    </div>
  )
}
