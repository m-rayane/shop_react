import React, { useContext } from 'react'

import { SignUpForm } from '../molecules/signUpForm'
import { AddressForm } from '../molecules/addressForm'
import { FormField } from '../atoms/form/formField'

import { Context } from '../../utils/Context'

export default function BillingForm({
  isCreating,
  handleChange,
  className,
  handleAddressFormChange,
  handleBlur,
}) {
  const { accountCategories } = useContext(Context)
  return (
    <>
      {' '}
      <h2>Détails de facturation</h2>
      <SignUpForm
        handleChange={handleChange}
        isCreating={isCreating}
        handleBlur={handleBlur}
        className={`${className}__SignUpForm`}
        defaultValue={{}}
      />
      <AddressForm
        categories={accountCategories.billing}
        handleBlur={handleBlur}
        handleChange={handleChange}
        className={`${className}__addressForm`}
      />
      {/* <div className={`${className}__addressForm__createAccount`}>
        <FormField
          className={`${className}__addressForm__createAccount__checkBox`}
          type="checkbox"
          name="createAnAccount"
          onChange={handleChange}
        />
        <p>Créer un compte ?</p>
      </div> */}
    </>
  )
}
