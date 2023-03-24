import '../../utils/styles/auth.scss'

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { regexName, regexEmail, regexPassword } from '../../utils/regex/regex'

import { SignInForm } from '../molecules/signInForm'
import { SignUpForm } from '../molecules/signUpForm'

import { Context } from '../../utils/Context'
import UserService from '../../api/Services/UserServices'

import { toLogin } from '../atoms/Services/authServices'
import { toHandleTestField } from '../atoms/Services/accountServices'

export default function Login() {
  const userServices = new UserService()
  const { getProducts, targetCategory, usersEmails, getExpirationDate } =
    useContext(Context)
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [isSignIn, setIsSignIn] = useState(true)
  const [activeSignInBtn, setActiveSignInBtn] = useState('activeBtn')
  const [activeSignUpBtn, setActiveSignUpBtn] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorBtn, setErrorBtn] = useState('')
  const [isCreating, setIsCreating] = useState('')

  // to submit signup
  const handleSignUpSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const firstNameValue = e.target['firstName'].value
    const lastNameValue = e.target['lastName'].value
    const emailValue = e.target['signUpEmail'].value
    const passwordValue = e.target['signUpPassword'].value
    const confirmPasswordValue = e.target['confirmPassword'].value

    const firstNameTest = regexName.test(firstNameValue)
    const lastNameTest = regexName.test(lastNameValue)
    const emailTest = regexEmail.test(emailValue)
    const passwordTest = regexPassword.test(passwordValue)

    const isEmail = usersEmails.find((user) => user.email === emailValue)
    isEmail
      ? setError('Un compte avec cette adresse email existe déjà !')
      : console.log('email ok')

    if (firstNameTest === false || firstNameValue.trim() === '') {
      setError("Le prénom n'est pas valide !")
      setErrorBtn('errorBtn')
    } else if (lastNameTest === false || lastNameValue.trim() === '') {
      setError("Le nom n'est pas valide !")
      setErrorBtn('errorBtn')
    } else if (emailTest === false || emailValue.trim() === '') {
      setError("L'adresse email n'est pas valide !")
      setErrorBtn('errorBtn')
    } else if (passwordTest === false || passwordValue.trim() === '') {
      setError(
        "Le mot de passe choisi n'est pas valide. Il doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et un chiffre. Les caractères spéciaux suivants ! @ # $ % ^ & * sont également authorisés."
      )
      setErrorBtn('errorBtn')
    } else if (passwordValue !== confirmPasswordValue) {
      setError('Le mot de passe ne correspond pas !')
      setErrorBtn('errorBtn')
    } else if (isEmail) {
      setError('Un compte avec cette adresse email existe déjà !')
      console.log('Un compte avec cette adresse email existe déjà !')
    } else {
      try {
        const userData = {
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
        }
        await userServices.createUser(userData)
        console.log('ok')
      } catch (err) {
        console.error(err)
      } finally {
        console.log('Compte créé')
        if (
          !isEmail &&
          emailValue &&
          passwordValue &&
          passwordValue === confirmPasswordValue
        ) {
          const email = emailValue
          const password = passwordValue
          const userData = {
            email: email,
            password: password,
          }
          await userServices.logInUser(userData).then((response) => {
            localStorage.setItem('userId', response.data.userId)
            localStorage.setItem(
              'expirationDate',
              response.data.tokenExpiration
            )
          })
          navigate('/', { replace: true })
        }
      }
    }
  }

  //to submit login
  const handleLogin = async (e) => {
    toLogin(e, setError)
    window.location.reload()
  }

  const handleSignInModal = async () => {
    setActiveSignInBtn('activeBtn')
    setActiveSignUpBtn('')
    setIsSignIn(true)
    setError('')
    setErrorBtn('')
  }

  const handleSignUpModal = async () => {
    setActiveSignInBtn('')
    setActiveSignUpBtn('activeBtn')
    setIsSignIn(false)
    setError('')
    setErrorBtn('')
    setIsCreating(true)
  }

  const handleChange = async () => {
    setError('')
    setErrorBtn('')
  }

  const handleEmailChange = () => {
    getProducts()
    const emailValue = document.getElementById('signUpEmail').value
    const isEmail = usersEmails.find((user) => user.email === emailValue)
    isEmail ? setError('Email already exist') : setError('')
  }

  const handleSubmitErrorMsg = (errorMsg) => {
    setErrorMsg(errorMsg)
  }

  const handleTestFields = () => {
    console.log(targetCategory)
    toHandleTestField(
      targetCategory.category,
      targetCategory.name,
      targetCategory.message,
      {
        errorMsg: handleSubmitErrorMsg,
      }
    )
  }

  return (
    <>
      <div className="auth">
        <div className="">
          <div className="auth__header">
            <div
              className={'auth__header__btn ' + activeSignInBtn}
              id="signInBtn"
              onClick={handleSignInModal}
            >
              Se connecter
            </div>
            <div
              className={'auth__header__btn ' + activeSignUpBtn}
              id="signUpBtn"
              onClick={handleSignUpModal}
            >
              Créer un compte
            </div>
          </div>
          <div className="auth__content">
            {isSignIn && (
              <div className="auth__content__login">
                <form
                  onSubmit={handleLogin}
                  className="auth__content__login__form"
                >
                  <SignInForm
                    className="auth__content__login__form"
                    handleChange={handleChange}
                    errorBtn={errorBtn}
                  />
                  <button>Se connecter</button>
                </form>
              </div>
            )}
            {!isSignIn && (
              <div className="auth__content__signUp">
                <form
                  onSubmit={handleSignUpSubmit}
                  className="auth__content__signUp__form"
                >
                  <SignUpForm
                    className="auth__content__signUp__form"
                    handleChange={handleChange}
                    handleEmailChange={handleEmailChange}
                    errorBtn={errorBtn}
                    isCreating={isCreating}
                    handleBlur={handleTestFields}
                  />
                  <button>Créer un compte</button>
                </form>
              </div>
            )}
            <div className="auth__content__message">
              <div className="auth__content__message__error">{error}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
