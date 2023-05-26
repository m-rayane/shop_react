import React, { useContext } from 'react'

import { Context } from '../../utils/Context'

import { AddressForm } from '../molecules/addressForm'
import { BillingAddress } from '../molecules/billingAddress'
import { ShippingAddress } from '../molecules/shippingAddress'
import { FormField } from '../atoms/form/formField'
import { TextField } from '../atoms/form/textField'

import { toAddShippingAddress } from '../atoms/Services/accountServices'

export default function CustomerInfo({
  className,
  userData,
  setErrorMsg,
  errorMsg,
  handleBlur,
  handleChange,
  origin,
  hideTitle,
}) {
  const {
    getUser,
    accountCategories,
    getShippingAddress,
    shippingAddress,
    additionnalComment,
    setAdditionnalComment,
    shippingAddressChecked,
    setShippingAddressChecked,
    setShowAddShippingForm,
    setTargetAddress,
  } = useContext(Context)
  const addShippingAddress = document.getElementById('addShippingAddress')

  const onSubmitBillingAddress = async (e) => {
    toAddShippingAddress(
      e,
      accountCategories.billing,
      userData,
      {
        errorMsg: handleSubmitErrorMsg,
      },
      'billing',
      getUser
    )
  }

  const onSubmitShippingAddress = async (e) => {
    toAddShippingAddress(
      e,
      accountCategories.shipping,
      userData,
      {
        errorMsg: handleSubmitErrorMsg,
      },
      'shipping',
      getShippingAddress
    )
    setShowAddShippingForm(false)
  }

  const handleSubmitErrorMsg = (errorMsg) => {
    setErrorMsg(errorMsg)
  }

  function handleAddShippingAddress() {
    setShippingAddressChecked(!shippingAddressChecked)
  }

  const handleTextareaChange = (e) => {
    setAdditionnalComment(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <>
      {!hideTitle && <h2>details de facturation et de livraison</h2>}

      <div className={`${className}`}>
        <div className={`${className}__billing`}>
          <BillingAddress
            className={`${className}__billing__billingAddress`}
            userData={userData}
            onSubmitBillingAddress={onSubmitBillingAddress}
            handleBlur={handleBlur}
            handleChange={handleChange}
            categories={accountCategories}
          />
        </div>
        <div className={`${className}__shipping`}>
          <div className={`${className}__shipping__title`}>
            {origin === 'cart' && (
              <>
                <FormField
                  className={`${className}__shipping__title__checkbox`}
                  type="checkbox"
                  name="addShippingAddress"
                  onChange={() => {
                    setShippingAddressChecked(!shippingAddressChecked)
                    setTargetAddress('')
                  }}
                  placeholder="Informations concernant votre commande. Ex : consignes de livraison."
                />
                <div>Adresse de livraison différente ?</div>
              </>
            )}
          </div>
          {(origin !== 'cart' ||
            (addShippingAddress && shippingAddressChecked)) && (
            <>
              {origin === 'cart' && (
                <h3 className={`${className}__title`}>
                  Choisissez une adresse de livraison :
                </h3>
              )}
              {origin !== 'cart' && (
                <h3 className={`${className}__title`}>
                  Adresses de livraison :
                </h3>
              )}
              <ShippingAddress
                className={`${className}__shipping__shippingAddress`}
                categories={accountCategories}
                handleBlur={handleBlur}
                handleChange={handleChange}
                onSubmitShippingAddress={onSubmitShippingAddress}
                errorMsg={errorMsg}
                shippingAddress={shippingAddress}
                origin={origin}
              />
            </>
          )}
        </div>
        {origin === 'cart' && (
          <TextField
            className={`${className}__orderInfos`}
            name="orderInfos"
            onChange={(e) => handleTextareaChange(e)}
            value={additionnalComment}
            children="Informations de commande"
            placeHolder="Informations concernant votre commande. Ex : consignes de livraison."
          />
        )}
      </div>
    </>
  )
}
