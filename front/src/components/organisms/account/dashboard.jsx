import '../../../utils/styles/account.scss'

import { BillingAddress } from '../../molecules/billingAddress'

export default function DashBoard({
  userData,
  orders,
  className,
  onSubmitBillingAddress,
  handleBlur,
  handleChange,
  categories,
}) {
  let lastOrder = []

  if (orders && orders.length > 0) {
    // Trouver l'article le plus récent
    lastOrder = orders.reduce((article1, article2) => {
      return article1.date > article2.date ? article2 : article1
    })
  }
  return (
    <div>
      <h2>{`Bienvenue dans votre tableau de bord ${userData.firstName} !`}</h2>
      <div className="">
        <BillingAddress
          className={`${className}`}
          userData={userData}
          onSubmitBillingAddress={onSubmitBillingAddress}
          handleBlur={handleBlur}
          handleChange={handleChange}
          categories={categories}
        />
      </div>
      <div className="">
        <h3>Votre dernière commande</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Prix</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{lastOrder.id}</td>
              <td>{lastOrder.createdDate}</td>
              <td>{lastOrder.totalPrice} €</td>
              <td>{lastOrder.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
