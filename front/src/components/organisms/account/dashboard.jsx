import '../../../utils/styles/account.scss'

import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../utils/Context'

import CustomerInfo from '../customerInfo'
import CartDetails from '../cartDetails'
import Summary from '../summary'

export default function DashBoard({ className }) {
  const {
    userData,
    getOrderDetailByOrder,
    orderDetailByOrder,
    ordersByUser,
    productsData,
  } = useContext(Context)
  const [order, setOrder] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [lastOrder, setLastOrder] = useState([])

  useEffect(() => {
    if (ordersByUser && ordersByUser.length > 0) {
      // Trouver l'article le plus récent
      const order = ordersByUser.reduce((article1, article2) => {
        return article1.createdDate > article2.createdDate ? article1 : article2
      })
      getOrderDetailByOrder(order._id)
      setLastOrder(order)
    }
  }, [ordersByUser])

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
    <div className={className}>
      <h2>{`bienvenue dans votre tableau de bord ${userData.firstName.toLowerCase()} !`}</h2>
      <div className={`${className}__lastOrder`}>
        <h2>Votre dernière commande</h2>
        {lastOrder ? (
          <div className={`${className}__lastOrder__info`}>
            <CartDetails
              className={`${className}__lastOrder__info__cartDetails`}
              cartData={orderDetailByOrder}
            />
          </div>
        ) : (
          "Vous n'avez encore rien commandé."
        )}
      </div>
      <div className={`${className}__data`}>
        <CustomerInfo
          className={`${className}__data__customerInfo`}
          userData={userData}
          // errorMsg={errorMsg}
          // setErrorMsg={setErrorMsg}
          // handleBlur={handleTestFields}
          // handleChange={() => setErrorMsg('')}
          origin="account"
        />
      </div>
    </div>
  )
}
