import UserService from '../../../api/Services/UserServices'

import { useContext } from 'react'
import { Context } from '../../../utils/Context'

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
  console.log(category, message)
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
    field.style.border = '1px solid red'
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
  addressType,
  getAddress
) => {
  console.log(userData)
  e.preventDefault()
  const newAddressData = { userId: userData.id }
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
      field.style.border = '1px solid red'
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
  addressType === 'billing' ? getAddress(userData.id) : getAddress()
}

export const toDeleteShippingAddress = async (
  addressId,
  getShippingAddress
) => {
  try {
    await userServices.deleteShippingAddress(addressId)
    getShippingAddress()
  } catch (error) {
    console.log(error)
  }
}
