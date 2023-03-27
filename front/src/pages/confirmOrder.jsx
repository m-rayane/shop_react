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
  } = useContext(Context)
  const [order, setOrder] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const { orderId } = useParams()

  useEffect(() => {
    getOrderDetailByOrder(orderId)
    getOrdersByUser(userData.id)
    setOrder(ordersByUser.find((o) => o._id === orderId))
  }, [])

  const cartData = orderDetailByOrder

  useEffect(() => {
    let totalPrice = 0
    if (cartData) {
      cartData.forEach((item) => {
        const productData = productsData.find((p) => p._id === item.productId)
        if (productData) {
          totalPrice += productData._price * item.quantity
        }
      })
    }
    setTotalPrice(totalPrice)
  }, [cartData, productsData])

  return (
    <div className="confirmOrder">
      <h1>{`Confirmation de commande n°${orderId}`}</h1>
      <section className="confirmOrder__info">
        <div className="confirmOrder__info__cart">
          <CartDetails
            className="confirmOrder__info__cart__cartDetails"
            cartData={cartData}
          />
        </div>
        <Summary
          className="confirmOrder__info__summary"
          totalPrice={totalPrice}
        />
      </section>
      <section class="shipping-info">
        <h2>Adresse de livraison</h2>
        {order && (
          <>
            <p>{order._shippingName}</p>
            <p>{order._shippingAddress}</p>
            <p>0{order._shippingPhone}</p>
          </>
        )}
      </section>
      <section class="additional-info">
        <h2>Informations supplémentaires</h2>
        <p>
          Votre commande sera expédiée dans les 24 heures et vous sera livrée
          sous 3 à 5 jours ouvrables.
        </p>
      </section>
      <footer>
        <p>Merci d'avoir choisi JOVIVE.FR !</p>
      </footer>
    </div>
  )
}
