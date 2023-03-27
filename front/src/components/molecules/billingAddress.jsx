import { AddressForm } from './addressForm'

export const BillingAddress = ({
  className,
  userData,
  onSubmitBillingAddress,
  handleBlur,
  handleChange,
  categories,
}) => {
  return (
    <>
      <h3>Adresse de facturation</h3>
      <div className={`${className}`}>
        <h4>
          {userData.firstName} {userData.lastName}
        </h4>
        {!userData.address && (
          <>
            <p>Vous n'avez pas encore enregistré une addresse de facturation</p>
            <form
              className={`${className}__addBillingForm`}
              onSubmit={onSubmitBillingAddress}
            >
              <h2>Veuillez saisir une adresse de facturation</h2>
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
            <p>{userData.address}</p>
            <p>{userData.zipCode}</p>
            <p>{userData.city}</p>
            <p>{userData.phoneNumber}</p>
          </>
        )}
      </div>
    </>
  )
}
