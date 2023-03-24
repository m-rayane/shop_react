import '../../../utils/styles/account.scss'

import { BillingAddress } from '../../molecules/billingAddress'
import { ShippingAddress } from '../../molecules/shippingAddress'

export default function UserDetail({
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
  userData,
}) {
  const date = new Date(userData._createdDate)
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
        <div key={userData._id}>
          <tr>
            <td>{userData._id}</td>
            <td>{date.toLocaleDateString()}</td>
            <td>{userData._firstName}</td>
            <td>{userData._lastName}</td>
            <td>{userData._email}</td>
            <td>{userData._role}</td>
            <td>{userData._address}</td>
            <td>{userData._zipCode}</td>
            <td>{userData._city}</td>
            <td>{userData._phoneNumber}</td>
          </tr>
          <BillingAddress
            userData={userData}
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
      </tbody>
    </table>
  )
}
