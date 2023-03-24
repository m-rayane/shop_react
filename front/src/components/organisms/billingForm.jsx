import React, { useContext } from 'react'

import { SignUpForm } from '../molecules/signUpForm'
import { AddressForm } from '../molecules/addressForm'
import { FormField } from '../atoms/form/formField'

import { Context } from '../../utils/Context'

const BillingForm = ({
  isCreating,
  handleChange,
  className,
  handleAddressFormChange,
  handleBlur,
}) => {
  const { accountCategories } = useContext(Context)
  return (
    <>
      {' '}
      <h2>Détails de facturation</h2>
      <SignUpForm isCreating={isCreating} handleBlur={handleBlur} />
      <AddressForm
        categories={accountCategories.billing}
        handleBlur={handleBlur}
        handleChange={handleAddressFormChange}
      />
      <FormField
        type="checkbox"
        name="createAnAccount"
        onChange={handleChange}
      />{' '}
      Créer un compte ?
    </>
  )
}

export default BillingForm
