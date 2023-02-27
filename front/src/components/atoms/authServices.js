import UserService from '../../api/Services/UserServices'

export const toLogin = async (email, password, setError) => {
  const userServices = new UserService()

  try {
    const userData = {
      email: email,
      password: password,
    }
    await userServices.logInUser(userData).then((response) => {
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('expirationDate', response.data.tokenExpiration)
    })
    window.location.reload()
  } catch (err) {
    setError('Adresse email ou mot de passe incorrecte.')
  }
}

export const toSignUp = async (userData, setError) => {
  const userServices = new UserService()

  try {
    await userServices.createUser(userData)
    window.location.reload()
  } catch (err) {
    setError('Adresse email ou mot de passe incorrecte.')
  }
}
