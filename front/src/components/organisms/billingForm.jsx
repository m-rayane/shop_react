import React, { useState, useEffect, useContext } from 'react'

import { SignUpForm } from '../molecules/signUpForm'
import { AddressForm } from '../molecules/addressForm'
import { FormField } from '../atoms/form/formField'

const BillingForm = ({ userData }) => {
  const handleSubmit = () => {}
  return (
    <>
      {' '}
      <h2>Détails de facturation</h2>
      <SignUpForm />
      <FormField type="tel" name="phoneNumber">
        Téléphone
      </FormField>
      <AddressForm />
      <FormField type="checkbox" name="createAnAccount" /> Créer un compte ?
    </>
  )
}

export default BillingForm
