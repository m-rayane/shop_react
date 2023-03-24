import '../../../utils/styles/backOffice.scss'

import { useContext, useEffect } from 'react'
import { Context } from '../../../utils/Context'

import { BillingAddress } from '../../molecules/billingAddress'
import { ShippingAddress } from '../../molecules/shippingAddress'
import AccountDetails from '../account/details'

export default function Customers({
  className,
  customerData,
  customerId,
  setCustomerData,
  setCustomerId,
}) {
  const { usersData } = useContext(Context)

  useEffect(() => {
    function handlePopState(event) {
      event.preventDefault()
      console.log('Retour arrière du navigateur détecté')
      setCustomerId('')
      setCustomerData('')
    }
    window.addEventListener('hashchange', handlePopState)
    return () => {
      window.removeEventListener('hashchange', handlePopState)
    }
  }, [setCustomerData, setCustomerId])
  return (
    <>
      {!customerId && (
        <>
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
                  <>
                    <tr
                      key={client._id}
                      onClick={() => {
                        setCustomerId(client._id)
                        setCustomerData(client)
                      }}
                    >
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
                  </>
                )
              })}
            </tbody>
          </table>
        </>
      )}
      {customerId && <AccountDetails userData={customerData} />}
    </>
  )
}
