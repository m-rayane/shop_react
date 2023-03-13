import '../../../utils/styles/account.scss'

import { AddressForm } from '../../molecules/addressForm'

export default function Address({
  userData,
  shippingAddress,
  onSubmitBillingAddress,
  onSubmitShippingAddress,
  handleBlur,
  handleChange,
  errorMsg,
  categories,
}) {
  return (
    <div>
      <div className="">
        <h2>Votre adresse de facturation</h2>
        <div className="">
          <p className="">
            {userData.firstName} {userData.lastName}
          </p>
          {!userData.address && (
            <>
              <form className="" onSubmit={onSubmitBillingAddress}>
                <p className="">Veuillez saisir une adresse de facturation</p>
                <AddressForm
                  categories={categories.billing}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
                <button type="submit">Soumettre</button>
              </form>
            </>
          )}
          {userData.address && (
            <>
              <p className="">{userData.address}</p>
              <p className="">
                {userData.zipCode} - {userData.city}
              </p>
              <p className="">{userData.phoneNumber}</p>
            </>
          )}
        </div>
      </div>
      <div className="">
        <h2>Vos adresses de livraisons</h2>
        <div className="">
          <div className="">
            <p className="">
              {userData.firstName} {userData.lastName}
            </p>
            <p className="">{userData.address}</p>
            <p className="">
              {userData.zipCode} - {userData.city}
            </p>
            <p className="">{userData.phoneNumber}</p>
          </div>
          {shippingAddress &&
            shippingAddress.map((address) => {
              return (
                <div className="" key={address.id}>
                  <p className="">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="">{address.address}</p>
                  <p className="">
                    {address.zipCode} - {address.city}
                  </p>
                  <p className="">{address.phoneNumber}</p>
                </div>
              )
            })}
          <form onSubmit={onSubmitShippingAddress} className="">
            <p className="">Ajouter une nouvelle adresse de livraison :</p>
            <AddressForm
              categories={categories.shipping}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />
            <button>Ajouter</button>
          </form>
          <p className="errorMsg">{errorMsg}</p>
        </div>
      </div>
    </div>
  )
}
