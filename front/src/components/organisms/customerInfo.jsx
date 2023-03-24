import React, { useContext } from 'react'

import { Context } from '../../utils/Context'

import { AddressForm } from '../molecules/addressForm'
import { BillingAddress } from '../molecules/billingAddress'
import { ShippingAddress } from '../molecules/shippingAddress'
import { FormField } from '../atoms/form/formField'
import { TextField } from '../atoms/form/textField'

import { toAddShippingAddress } from '../atoms/Services/accountServices'

const CustomerInfo = ({
  className,
  userData,
  setErrorMsg,
  errorMsg,
  handleBlur,
  handleChange,
  origin,
}) => {
  const {
    getUser,
    accountCategories,
    getShippingAddress,
    shippingAddress,
    additionnalComment,
    setAdditionnalComment,
    shippingAddressChecked,
    setShippingAddressChecked,
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
      {' '}
      <h2>Détails de facturation et de livraison</h2>
      <div className={`${className}`}>
        <div className={`${className}__leftCol`}>
          <BillingAddress
            className={`${className}__leftCol__billingAddress`}
            userData={userData}
            onSubmitBillingAddress={onSubmitBillingAddress}
            handleBlur={handleBlur}
            handleChange={handleChange}
            categories={accountCategories}
          />
          {shippingAddressChecked && (
            <>
              <TextField
                className={`${className}__orderInfos`}
                name="orderInfos"
                onChange={(e) => handleTextareaChange(e)}
                value={additionnalComment}
                children="Informations de commande"
                placeHolder="Informations concernant votre commande. Ex : consignes de livraison."
              />
            </>
          )}
        </div>
        <div className={`${className}__rightCol`}>
          <div className={`${className}__rightCol__title`}>
            {origin === 'cart' && (
              <>
                <FormField
                  className={`${className}__rightCol__title__checkbox`}
                  type="checkbox"
                  name="addShippingAddress"
                  onChange={handleAddShippingAddress}
                  placeholder="Informations concernant votre commande. Ex : consignes de livraison."
                />
                <div>Adresse de livraison différente ?</div>
              </>
            )}
          </div>
          {!shippingAddressChecked && origin === 'cart' && (
            <TextField
              className={`${className}__orderInfos`}
              name="orderInfos"
              onChange={(e) => handleTextareaChange(e)}
              value={additionnalComment}
              children="Informations de commande"
              placeHolder="Informations concernant votre commande. Ex : consignes de livraison."
            />
          )}
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
                className={`${className}__rightCol__shippingAddress`}
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
      </div>
    </>
  )
}

export default CustomerInfo
