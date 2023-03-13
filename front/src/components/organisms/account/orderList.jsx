import '../../../utils/styles/account.scss'

import { Link } from 'react-router-dom'

export default function OrderList({ userData, orders }) {
  return (
    <div>
      <h2>{`Voici la liste de toutes vos commandes !`}</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Prix</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.createdDate}</td>
              <td>{order.totalPrice} €</td>
              <td>{order.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
