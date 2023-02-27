import React, { useState, useEffect, useContext } from 'react'

import { SignUpForm } from '../molecules/signUpForm'
import { AddressForm } from '../molecules/addressForm'
import { FormField } from '../atoms/form/formField'

const CustomerInfo = ({ userData, onSubmit }) => {
  const addShippingAddress = document.getElementById('addShippingAddress')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    if (addShippingAddress) {
      addShippingAddress.addEventListener('change', () => {
        setIsChecked(!isChecked)
      })
    }
  }, [addShippingAddress, isChecked])

  return (
    <>
      {' '}
      <h2>Détails de facturation</h2>
      <div className="">
        <p className="">{`Nom: ${userData.firstName} ${userData.lastName}`}</p>
        {!userData.address && (
          <>
            <form className="" onSubmit={onSubmit}>
              <p className="">Veuillez saisir une adresse de facturation</p>
              <AddressForm />
              <FormField type="tel" name="phoneNumber">
                Téléphone
              </FormField>
              <button type="submit">Soumettre</button>
            </form>
          </>
        )}
        {userData.address && (
          <div className="">
            <p className="">{`Adresse de facturation: ${userData.address}, ${userData.zipCode} - ${userData.city}`}</p>
          </div>
        )}
        <FormField type="checkbox" name="addShippingAddress" /> Adresse de
        livraison différente ?
        {addShippingAddress && isChecked && (
          <>
            <form className="" onSubmit={onSubmit}>
              <p className="">Veuillez saisir une adresse de livraison</p>
              <AddressForm />
              <button type="submit">Soumettre</button>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default CustomerInfo
