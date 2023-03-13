import UserService from '../../../api/Services/UserServices'

import {
  regexName,
  regexEmail,
  regexPassword,
  regexAddress,
  regexZipCode,
  regexPhone,
  regexCity,
} from '../../../utils/regex/regex'

const userServices = new UserService()

export const toLogin = async (e, setError) => {
  e.preventDefault()
  try {
    const userData = {
      email: e.target['signInEmail'].value,
      password: e.target['signInPassword'].value,
    }
    await userServices.logInUser(userData).then((response) => {
      console.log(response)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('expirationDate', response.data.tokenExpiration)
    })
  } catch (err) {
    setError('Adresse email ou mot de passe incorrecte.')
  }
}

export const toSignUp = async (userData, setError) => {
  try {
    await userServices.createUser(userData)
    window.location.reload()
  } catch (err) {
    setError('Adresse email ou mot de passe incorrecte.')
  }
}
