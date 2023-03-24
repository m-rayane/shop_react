export const OrderList = ({
  className,
  orders,
  setShowDetails,
  setTargetOrder,
}) => {
  const handleShowDetails = (id) => {
    setShowDetails(true)
    setTargetOrder(id)
  }

  return (
    <>
      <h2>Commandes</h2>
      <table>
        <thead>
          <tr>
            <th>Numéro de commande</th>
            <th>Date</th>
            <th>Prix</th>
            <th>Adresse de livraison</th>
            <th>status</th>
          </tr>
        </thead>

        {orders.map((order) => {
          return (
            <tbody>
              <tr key={order.id} onClick={() => handleShowDetails(order.id)}>
                <td>{order.id}</td>
                <td>{order.createdDate}</td>
                <td>{order.totalPrice} €</td>
                <td>
                  {order.shippingName} - {order.shippingAddress}
                  {' - '}0{order.shippingPhone}
                </td>
                <td>{order.status}</td>
              </tr>
            </tbody>
          )
        })}
      </table>
    </>
  )
}
