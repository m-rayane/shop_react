import '../../../utils/styles/account.scss'

import { BillingAddress } from '../../molecules/billingAddress'
import { ShippingAddress } from '../../molecules/shippingAddress'

export default function Customer({
  className,
  usersData,
  orders,
  handleBlur,
  handleChange,
  onSubmitBillingAddress,
  onSubmitShippingAddress,
  errorMsg,
  categories,
  shippingAddress,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date de création</th>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Adresse</th>
          <th>Code postal</th>
          <th>Ville</th>
          <th>Numéro de téléphone</th>
        </tr>
      </thead>
      <tbody>
        {usersData.map((client) => {
          const date = new Date(client._createdDate)
          return (
            <div key={client._id}>
              <tr>
                <td>{client._id}</td>
                <td>{date.toLocaleDateString()}</td>
                <td>{client._firstName}</td>
                <td>{client._lastName}</td>
                <td>{client._email}</td>
                <td>{client._role}</td>
                <td>{client._address}</td>
                <td>{client._zipCode}</td>
                <td>{client._city}</td>
                <td>{client._phoneNumber}</td>
              </tr>
              <BillingAddress
                userData={client}
                onSubmitBillingAddress={onSubmitBillingAddress}
                handleBlur={handleBlur}
                handleChange={handleChange}
                categories={categories.billing}
              />
              <ShippingAddress
                categories={categories.shipping}
                handleBlur={handleBlur}
                handleChange={handleChange}
                onSubmitShippingAddress={onSubmitShippingAddress}
                errorMsg={errorMsg}
                shippingAddress={shippingAddress}
              />
              <div className="">
                <p>Commandes</p>
                {/* <p>{orders}</p> */}
              </div>
            </div>
          )
        })}
      </tbody>
    </table>
  )
}
