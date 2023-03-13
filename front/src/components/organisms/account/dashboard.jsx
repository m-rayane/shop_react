import '../../../utils/styles/account.scss'

import { Link } from 'react-router-dom'

export default function DashBoard({ userData, orders }) {
  let lastOrder = []

  if (orders && orders.length > 0) {
    // Trouver l'article le plus récent
    lastOrder = orders.reduce((article1, article2) => {
      return article1.date > article2.date ? article2 : article1
    })
  }
  return (
    <div>
      <h2>{`Bienvenue dans votre tableau de bord, ${userData.firstName} !`}</h2>
      <div className="">
        <h3>Vos coordonnées</h3>
      </div>
      <div className="">
        <h3>Votre dernière commande</h3>
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
            <tr>
              <td>{lastOrder.id}</td>
              <td>{lastOrder.createdDate}</td>
              <td>{lastOrder.totalPrice} €</td>
              <td>{lastOrder.statut}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
