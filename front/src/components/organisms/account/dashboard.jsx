import '../../../utils/styles/account.scss'

import { useContext, useEffect, useState } from 'react'
import { Context } from '../../../utils/Context'

import CustomerInfo from '../customerInfo'
import CartDetails from '../cartDetails'
import Summary from '../summary'

export default function DashBoard() {
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
  const [lastOrder, setLastOrder] = useState()

  console.log(ordersByUser)
  console.log(userData)

  useEffect(() => {
    if (ordersByUser && ordersByUser.length > 0) {
      // Trouver l'article le plus récent
      const order = ordersByUser.reduce((article1, article2) => {
        return article1.date > article2.date ? article2 : article1
      })
      console.log(order)
      setLastOrder(order)
    }
  }, [])

  console.log(lastOrder)

  // const orderDetails = getOrderDetailByOrder(lastOrder.id)

  // useEffect(() => {
  //   if (lastOrder) {
  //     getOrderDetailByOrder(lastOrder.id)
  //   }
  // }, [])

  useEffect(() => {
    let totalPrice = 0
    if (lastOrder) {
      lastOrder.forEach((item) => {
        const productData = productsData.find((p) => p._id === item.productId)
        if (productData) {
          totalPrice += productData._price * item.quantity
        }
      })
    }
    setTotalPrice(totalPrice)
  }, [lastOrder, productsData])

  return (
    <>
      <h2>{`Bienvenue dans votre tableau de bord ${userData.firstName} !`}</h2>
      <div className="">
        <h3>Votre dernière commande</h3>
        <section className="confirmOrder__info">
          <div className="confirmOrder__info__cart">
            <CartDetails
              className="confirmOrder__info__cart__cartDetails"
              cartData={lastOrder}
            />
          </div>
          <Summary
            className="confirmOrder__info__summary"
            totalPrice={totalPrice}
          />
        </section>

        {/* <td>{lastOrder.id}</td>
              <td>{lastOrder.createdDate}</td>
              <td>{lastOrder.totalPrice} €</td>
              <td>{lastOrder.status}</td> */}
      </div>
      <div className="">
        {/* <BillingAddress
          className={`${className}`}
          userData={userData}
          onSubmitBillingAddress={onSubmitBillingAddress}
          handleBlur={handleBlur}
          handleChange={handleChange}
          categories={categories}
        /> */}
        <CustomerInfo
          className="cart__leftSection__customerInfo"
          userData={userData}
          // errorMsg={errorMsg}
          // setErrorMsg={setErrorMsg}
          // handleBlur={handleTestFields}
          // handleChange={() => setErrorMsg('')}
          origin="account"
        />
      </div>
    </>
  )
}
