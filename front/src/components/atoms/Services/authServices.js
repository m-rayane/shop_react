import UserService from '../../../api/Services/UserServices'

const userServices = new UserService()

export const toLogin = async (e, setError) => {
  e.preventDefault()
  try {
    const userData = {
      email: e.target['signInEmail'].value,
      password: e.target['signInPassword'].value,
    }
    await userServices.logInUser(userData).then((response) => {
      console.log(response.data)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('expirationDate', response.data.tokenExpiration)
      localStorage.setItem('role', response.data.role)
    })
  } catch (err) {
    setError('Adresse email ou mot de passe incorrecte.')
  }
}

// export const toSignUp = async (userData, setError) => {
//   e.preventDefault()
//   setError('')
//   const firstNameValue = e.target['firstName'].value
//   const lastNameValue = e.target['lastName'].value
//   const emailValue = e.target['signUpEmail'].value
//   const passwordValue = e.target['signUpPassword'].value
//   const confirmPasswordValue = e.target['confirmPassword'].value

//   const firstNameTest = regexName.test(firstNameValue)
//   const lastNameTest = regexName.test(lastNameValue)
//   const emailTest = regexEmail.test(emailValue)
//   const passwordTest = regexPassword.test(passwordValue)

//   const isEmail = usersEmails.find((user) => user.email === emailValue)
//   isEmail
//     ? setError('Un compte avec cette adresse email existe déjà !')
//     : console.log('email ok')

//   if (firstNameTest === false || firstNameValue.trim() === '') {
//     setError("Le prénom n'est pas valide !")
//   } else if (lastNameTest === false || lastNameValue.trim() === '') {
//     setError("Le nom n'est pas valide !")
//   } else if (emailTest === false || emailValue.trim() === '') {
//     setError("L'adresse email n'est pas valide !")
//   } else if (passwordTest === false || passwordValue.trim() === '') {
//     setError(
//       "Le mot de passe choisi n'est pas valide. Il doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et un chiffre. Les caractères spéciaux suivants ! @ # $ % ^ & * sont également authorisés."
//     )
//   } else if (passwordValue !== confirmPasswordValue) {
//     setError('Le mot de passe ne correspond pas !')
//   } else if (isEmail) {
//     setError('Un compte avec cette adresse email existe déjà !')
//     console.log('Un compte avec cette adresse email existe déjà !')
//   } else {
//     try {
//       const userData = {
//         firstName: firstNameValue,
//         lastName: lastNameValue,
//         email: emailValue,
//         password: passwordValue,
//       }
//       await userServices.createUser(userData)
//       console.log('ok')
//     } catch (err) {
//       console.error(err)
//     } finally {
//       console.log('Compte créé')
//       if (
//         !isEmail &&
//         emailValue &&
//         passwordValue &&
//         passwordValue === confirmPasswordValue
//       ) {
//         const email = emailValue
//         const password = passwordValue
//         const userData = {
//           email: email,
//           password: password,
//         }
//         await userServices.logInUser(userData).then((response) => {
//           localStorage.setItem('userId', response.data.userId)
//           localStorage.setItem('expirationDate', response.data.tokenExpiration)
//         })
//         navigate('/', { replace: true })
//       }
//     }
//   }
// }
