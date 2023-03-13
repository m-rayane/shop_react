import { useState } from 'react'
import UserService from '../../../api/Services/UserServices'

import {
  regexName,
  regexEmail,
  regexAddress,
  regexZipCode,
  regexPhone,
  regexCity,
} from '../../../utils/regex/regex'

const userServices = new UserService()

export const toHandleTestField = (category, name, message, { errorMsg }) => {
  const field = document.getElementById(`${category}`)
  let fieldTest = ''
  if (category.toLowerCase().includes('name')) {
    fieldTest = regexName.test(field.value)
  } else if (category.toLowerCase().includes('email')) {
    fieldTest = regexEmail.test(field.value)
  } else if (category.toLowerCase().includes('address')) {
    fieldTest = regexAddress.test(field.value)
  } else if (category.toLowerCase().includes('zipcode')) {
    fieldTest = regexZipCode.test(field.value)
  } else if (category.toLowerCase().includes('city')) {
    fieldTest = regexCity.test(field.value)
  } else if (category.toLowerCase().includes('phone')) {
    fieldTest = regexPhone.test(field.value)
  }
  if (fieldTest === false || field.value.trim() === '') {
    field.style.border = '2px solid red'
    errorMsg(`${message} n'est pas valide !`)
  } else {
    field.style.border = ''
    console.log(`${message} est valide !`)
  }
}

export const toAddShippingAddress = async (
  e,
  categories,
  userData,
  { errorMsg },
  addressType
) => {
  e.preventDefault()
  const newAddressData =
    addressType === 'shipping' ? { userId: userData.id } : {}
  for (let category of categories) {
    const field = e.target[`${category.category}`]
    let fieldTest = ''
    if (category.category.toLowerCase().includes('name')) {
      fieldTest = regexName.test(field.value)
    } else if (category.category.toLowerCase().includes('email')) {
      fieldTest = regexEmail.test(field.value)
    } else if (category.category.toLowerCase().includes('address')) {
      fieldTest = regexAddress.test(field.value)
    } else if (category.category.toLowerCase().includes('zipcode')) {
      fieldTest = regexZipCode.test(field.value)
    } else if (category.category.toLowerCase().includes('city')) {
      fieldTest = regexCity.test(field.value)
    } else if (category.category.toLowerCase().includes('phone')) {
      fieldTest = regexPhone.test(field.value)
    }
    if (fieldTest === false || field.value.trim() === '') {
      field.style.border = '2px solid red'
      errorMsg(`Veuillez remplir tous les champs.`)
    } else {
      field.style.border = ''
      newAddressData[`${category.key}`] = field.value
      console.log(`${category.message} est valide !`)
    }
  }
  try {
    addressType === 'billing'
      ? await userServices.editUser(userData.id, newAddressData)
      : await userServices.addShippingAddress(userData.id, newAddressData)
  } catch (err) {
    console.error(err)
  }
}
