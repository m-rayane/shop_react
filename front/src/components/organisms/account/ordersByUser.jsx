import '../../../utils/styles/account.scss'

import { useContext, useState } from 'react'
import { Context } from '../../../utils/Context'

import { OrderList } from '../../molecules/orderList'

export default function OrdersByUser({
  userData,
  orders,
  setShowDetails,
  showDetails,
}) {
  const { getOrderDetail, orderDetailByUser, productsData } =
    useContext(Context)

  const [targetOrder, setTargetOrder] = useState(false)

  const orderDetailByOrder = orderDetailByUser.filter(
    (detail) => detail._orderId === targetOrder
  )

  return (
    <div>
      {!showDetails && (
        <OrderList
          orders={orders}
          setShowDetails={setShowDetails}
          setTargetOrder={setTargetOrder}
        />
      )}
      {showDetails &&
        orderDetailByUser &&
        orderDetailByOrder.map((order) => {
          const productData = productsData.find(
            (item) => item._id === order._productId
          )
          console.log(productData)
          return (
            <>
              <div>{productData._name}</div>
              <div>{productData._price}</div>
            </>
          )
        })}
    </div>
  )
}
