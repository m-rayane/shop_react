import { useContext, useEffect, useState } from 'react'

import { Context } from '../../../utils/Context'

import OrderService from '../../../api/Services/OrderServices'
import EmailService from '../../../api/Services/EmailServices'

export const OrderDetail = ({ className, orderId, setOrderEmailDetail }) => {
  const [orderDetail, setOrderDetail] = useState([])
  const { usersData, allOrders, orderDetailByOrder, productsData } =
    useContext(Context)

  const orderServices = new OrderService()
  const emailServices = new EmailService()

  const order = allOrders.find((o) => o._id === orderId)
  const customer = usersData.find((c) => c._id === order._userId)

  console.log(order)
  console.log(customer)
  return (
    <div className={className}>
      <div className={`${className}__title`}>
        {`Detail de la commande N°`}
        <span>{order._id}</span>
      </div>
      <div className={`${className}__addressInfos`}>
        <table className={`${className}__addressInfos__billing`}>
          <thead>
            <tr>
              <th>Adresse de facturation</th>
              <th>Téléphone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {customer._address}, {customer._zipCode} {customer._city}
              </td>
              <td>{customer._phoneNumber}</td>
            </tr>
          </tbody>
        </table>
        <table className={`${className}__addressInfos__shipping`}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Adresse de livraison</th>
              <th>Téléphone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{order._shippingName}</td>
              <td>{order._shippingAddress}</td>
              <td>0{order._shippingPhone}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className={`${className}__dates`}>
        <thead>
          <tr>
            <th>Date de création</th>
            <th>Date de préparation</th>
            <th>Date de d'expédition</th>
            <th>Date de de livraison</th>
            <th>Date de de d'annulation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{order._createdDate}</td>
            <td>{order._preparationDate}</td>
            <td>{order._shippingDate}</td>
            <td>{order._deliveringDate}</td>
            <td>{order._cancelingDate}</td>
          </tr>
        </tbody>
      </table>
      <table className={`${className}__detail`}>
        <thead>
          <tr>
            <th>Nom du produit</th>
            <th>Id du produit</th>
            <th>quantité</th>
            <th>Prix unitaire</th>
            <th>Réduction</th>
            <th>Prix total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetailByOrder.map((item) => {
            console.log(item)
            const productDetail = productsData.find(
              (p) => p._id === item._productId
            )
            console.log(productDetail)
            return (
              <tr>
                <td>{productDetail._name}</td>
                <td>{item._productId}</td>
                <td>{item._quantity}</td>
                <td>{item._priceUnit.toFixed(2)} €</td>
                <td>{item.discount}</td>
                <td>{(item._priceUnit * item._quantity).toFixed(2)} €</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
