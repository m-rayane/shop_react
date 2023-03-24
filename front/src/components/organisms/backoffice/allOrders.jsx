import '../../../utils/styles/backOffice.scss'

import { useContext, useState } from 'react'
import { Context } from '../../../utils/Context'

import ConfirmBox from '../../molecules/confirmBox'
import { FormField } from '../../atoms/form/formField'
import { ConfirmButtons } from '../../molecules/confirmButtons'
import { EditSvg } from '../../atoms/svg/edit'

import { OrderDetail } from './orderDetail'

import OrderService from '../../../api/Services/OrderServices'
import EmailService from '../../../api/Services/EmailServices'

export default function AllOrders({ className }) {
  const {
    usersData,
    allOrders,
    getAllOrders,
    orderDetailByOrder,
    productsData,
    getOrderDetailByOrder,
  } = useContext(Context)
  const [confirmStatus, setConfirmStatus] = useState(false)
  const [targetOrder, setTargetOrder] = useState('')
  const [orderDetailId, setOrderDetailId] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [shippingNumber, setShippingNumber] = useState('')

  const orderServices = new OrderService()
  const emailServices = new EmailService()

  const allStatus = [
    {
      name: 'En préparation',
      dateKey: 'preparationDate',
      message: 'est en préparation',
      sqlColumn: 'preparationDate',
      key: 'prepared',
    },
    {
      name: 'Expédiée',
      dateKey: 'shippingDate',
      message: 'à été expédiée',
      sqlColumn: 'shippingDate',
      key: 'shipped',
    },
    {
      name: 'Livrée',
      dateKey: 'deliveringDate',
      message: 'à été livrée',
      sqlColumn: 'deliveringDate',
      key: 'delivered',
    },
    {
      name: 'Annulée',
      dateKey: 'cancelingDate',
      message: 'à été annulée',
      sqlColumn: 'cancelingDate',
      key: 'canceled',
    },
  ]

  return (
    <div className={className}>
      <h2>Liste des commandes</h2>
      <div className={`${className}__table`}>
        <table>
          <thead>
            <tr>
              <th>Numéro de commande</th>
              <th>Nom du client</th>
              <th>Date de commande</th>
              <th>Prix total</th>
              <th>statut de la commande</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => {
              const customer = usersData.find(
                (customer) => customer._id === order._userId
              )

              const handleCancel = (e) => {
                e.preventDefault()
                setConfirmStatus(false)
              }

              const handleConfirmStatus = async () => {
                const date = new Date()
                const updatedDate = date
                  .toISOString()
                  .slice(0, 19)
                  .replace('T', ' ')

                const data = {
                  status: newStatus,
                }
                const statusData = allStatus.find((s) => s.name === data.status)
                data[`${statusData.dateKey}`] = updatedDate

                if (newStatus === 'Expédiée' && shippingNumber) {
                  data[`shippingNumber`] = shippingNumber
                }

                const orderDetailForEmail = []
                if (orderDetailByOrder) {
                  console.log(orderDetailByOrder)
                  for (let i = 0; i < orderDetailByOrder.length; i++) {
                    const productInCart = productsData.find(
                      (p) => p._id === orderDetailByOrder[i].productId
                    )
                    if (productInCart) {
                      const orderProduct = {
                        productName: productInCart._name,
                        productId: productInCart._id,
                        quantity: orderDetailByOrder[i].quantity,
                        price: productInCart._price,
                      }
                      orderDetailForEmail.push(orderProduct)
                    }
                  }
                }

                if (newStatus === 'Expédiée' && shippingNumber === '') {
                  alert("Veuillez entrer un numéro d'expédition")
                } else {
                  try {
                    console.log(orderDetailForEmail)
                    console.log(customer)
                    const response = await orderServices.putOrder(
                      order.id,
                      data
                    )
                    const emailDataClient = {
                      from: 'nodemailer38@gmail.com',
                      to: customer._email,
                      subject: `Votre commande n° ${response.data.orderId} ${statusData.message}`,
                      title: `Votre commande n° ${response.data.orderId} ${statusData.message}`,
                      orderId: response.data.orderId,
                      shippingNumber: shippingNumber,
                      orderStatus: statusData.key,
                      orderDetails: orderDetailForEmail,
                    }
                    await emailServices.sendEmail(emailDataClient)
                  } catch (error) {
                    console.error(error)
                  }
                  setConfirmStatus(false)
                  setTargetOrder('')
                  setNewStatus('')
                  getAllOrders()
                }
              }

              const handleOrderDetail = (id) => {
                setOrderDetailId(id)
              }

              const handleShowDetail = (id) => {
                targetOrder !== id ? setTargetOrder(id) : setTargetOrder('')
                orderDetailId !== id
                  ? setOrderDetailId(id)
                  : setOrderDetailId('')
                setNewStatus('')
                getOrderDetailByOrder(id)
              }

              return (
                <>
                  <tr
                    key={order.id}
                    style={{
                      background:
                        orderDetailId === order.id
                          ? 'rgba(254, 209, 55, 0.1)'
                          : 'white',
                    }}
                  >
                    <td
                      className="link"
                      onClick={() => {
                        handleShowDetail(order.id)
                      }}
                    >
                      {order.id}
                    </td>
                    <td className="link">
                      {customer
                        ? `${customer._firstName} ${customer._lastName}`
                        : 'NA'}
                    </td>
                    <td>{order.createdDate}</td>
                    <td>{order.totalPrice.toFixed(2)} €</td>
                    <td>
                      <div className={`${className}__table__status`}>
                        {newStatus === '' && targetOrder === '' && (
                          <>
                            <p>{order.status}</p>
                            <div
                              className=""
                              onClick={() => {
                                handleShowDetail(order.id)
                              }}
                            >
                              <EditSvg />
                            </div>
                          </>
                        )}
                        {targetOrder === order.id && (
                          <>
                            <label htmlFor="orderStatus"></label>
                            <div className="">
                              <select
                                id="orderStatus"
                                defaultValue={order.status}
                                onChange={(e) => {
                                  setNewStatus(e.target.value)
                                }}
                              >
                                <option value="En attente de validation">
                                  En attente de validation
                                </option>
                                <option value="En préparation">
                                  En préparation
                                </option>
                                <option value="Expédiée">Expédiée</option>
                                <option value="Livrée">Livrée</option>
                                <option value="Annulée">Annulée</option>
                              </select>

                              <FormField
                                className={`${className}__table__status__shippingNumber`}
                                name="addShippingNumber"
                                placeholder="Numéro de colis si expédiée..."
                                onChange={(e) =>
                                  setShippingNumber(e.target.value)
                                }
                              />
                            </div>
                            <ConfirmButtons
                              className=""
                              handleCancel={() => {
                                setTargetOrder('')
                                setNewStatus('')
                                orderDetailId !== order.id
                                  ? handleOrderDetail(order.id)
                                  : setOrderDetailId('')
                              }}
                              handleConfirm={() => setConfirmStatus(true)}
                            />
                          </>
                        )}
                        {confirmStatus && targetOrder === order.id && (
                          <>
                            <div className={`${className}__layout`}></div>
                            <ConfirmBox
                              message="Confirmer changement de status ?"
                              className={`${className}__confirmBox`}
                              handleCancel={handleCancel}
                              handleConfirm={handleConfirmStatus}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  {orderDetailId === order.id && (
                    <tr
                      style={{
                        background:
                          orderDetailId === order.id
                            ? 'rgba(254, 209, 55, 0.1)'
                            : 'white',
                      }}
                    >
                      <td colSpan="5">
                        <OrderDetail
                          className={`${className}__table__detail`}
                          orderId={order.id}
                        />
                      </td>
                    </tr>
                  )}
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
