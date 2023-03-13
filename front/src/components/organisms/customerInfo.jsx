import React, { useEffect, useState } from 'react'

import { AddressForm } from '../molecules/addressForm'
import { FormField } from '../atoms/form/formField'

const CustomerInfo = ({
  userData,
  onSubmitBillingAddress,
  onSubmitShippingAddress,
  shippingAddress,
  targetAddress,
  setTargetAddress,
  isChecked,
  setIsChecked,
  errorMsg,
  handleBlur,
  categories,
  handleChange,
}) => {
  const addShippingAddress = document.getElementById('addShippingAddress')

  function handleAddShippingAddress() {
    setIsChecked(!isChecked)
  }

  const handleAddressClick = (id) => {
    setTargetAddress(id)
  }

  return (
    <>
      {' '}
      <h2>Détails de facturation</h2>
      <div className="">
        <p className="">{`Nom: ${userData.firstName} ${userData.lastName}`}</p>
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
          <div className="">
            <p className="">{`Adresse de facturation: ${userData.address}, ${userData.zipCode} - ${userData.city}`}</p>
          </div>
        )}
        <FormField
          type="checkbox"
          name="addShippingAddress"
          onChange={handleAddShippingAddress}
        />{' '}
        Adresse de livraison différente ?
        {addShippingAddress && isChecked && (
          <>
            <div className="">Vos adresses de livraison</div>
            {shippingAddress &&
              shippingAddress.map((address) => {
                return (
                  <div
                    className={
                      targetAddress === address.id
                        ? 'selected__shipping-address'
                        : ''
                    }
                    onClick={() => {
                      handleAddressClick(address.id)
                    }}
                    style={
                      targetAddress === address.id
                        ? { border: '2px solid green', cursor: 'pointer' }
                        : { border: '1px solid white', cursor: 'pointer' }
                    }
                  >
                    <p
                      id={
                        targetAddress === address.id ? 'selected--address' : ''
                      }
                    >
                      {address.address}
                    </p>
                    <p
                      id={
                        targetAddress === address.id ? 'selected--zipcode' : ''
                      }
                    >
                      {address.zipCode}
                    </p>
                    <p
                      id={targetAddress === address.id ? 'selected--city' : ''}
                    >
                      {address.city}
                    </p>
                  </div>
                )
              })}
            <form className="" onSubmit={onSubmitShippingAddress}>
              <p className="">Ajouter une adresse de livraison</p>
              <AddressForm
                categories={categories.shipping}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <button type="submit">Ajouter une nouvelle adresse</button>
              <p className="">{errorMsg}</p>
            </form>
          </>
        )}
      </div>
    </>
  )
}

export default CustomerInfo
