import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../utils/Context'
import { updateCart, deleteProduct } from '../components/atoms/cartSerivces'

import {
  regexName,
  regexEmail,
  regexPassword,
  regexAddress,
  regexZipCode,
  regexPhone,
  regexCity,
} from '../utils/regex/regex'

import OrderServices from '../api/Services/OrderServices'
import UserService from '../api/Services/UserServices'
import FormData from 'form-data'

import CartDetails from '../components/organisms/cartDetails'
import BillingForm from '../components/organisms/billingForm'
import CustomerInfo from '../components/organisms/customerInfo'
import { SignInForm } from '../components/molecules/signInForm'

const Cart = () => {
  const { productsData, userData, usersData } = useContext(Context)
  const [cartData, setCartData] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [isValidated, setIsValidated] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [error, setError] = useState('')
  const [errorBtn, setErrorBtn] = useState('')

  const orderServices = new OrderServices()
  const userServices = new UserService()
  const navigate = useNavigate()

  const createAnAccount = document.getElementById('createAnAccount')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [])

  useEffect(() => {
    let totalPrice = 0
    if (cartData) {
      cartData.forEach((item) => {
        const productData = productsData.find((p) => p._id === item.productId)
        if (productData) {
          totalPrice += productData._price * item.quantity
        }
      })
    }
    setTotalPrice(totalPrice)
  }, [cartData, productsData])

  const handleCartSubmit = async (e) => {
    e.preventDefault()
    setIsValidated(true)
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    console.log('order submit')
    // setIsValidated(false)
    if (createAnAccount && createAnAccount.checked) {
      // setError('')

      const firstNameValue = e.target['firstName'].value
      const lastNameValue = e.target['lastName'].value
      const emailValue = e.target['signUpEmail'].value
      const passwordValue = e.target['signUpPassword'].value
      const confirmPasswordValue = e.target['confirmPassword'].value
      const addressValue = e.target['address'].value
      const zipCodeValue = e.target['zipCode'].value
      const cityValue = e.target['city'].value
      const phoneValue = e.target['phoneNumber'].value

      const firstNameTest = regexName.test(firstNameValue)
      const lastNameTest = regexName.test(lastNameValue)
      const emailTest = regexEmail.test(emailValue)
      const passwordTest = regexPassword.test(passwordValue)
      const addressTest = regexAddress.test(addressValue)
      const zipCodeTest = regexZipCode.test(zipCodeValue)
      const cityTest = regexCity.test(cityValue)
      const phoneNumberTest = regexPhone.test(phoneValue)

      const isEmail = usersData.find((user) => user._email === emailValue)
      isEmail ? setError('Email already exist') : console.log('email ok')

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
      } else if (passwordTest === false || passwordValue.trim() === '') {
        setError('Le mot de passe ne correspond pas !')
        setErrorBtn('errorBtn')
      } else if (addressTest === false || addressValue.trim() === '') {
        setError("L'adresse renseignée n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (zipCodeTest === false || zipCodeValue.trim() === '') {
        setError("Le code postal renseigné n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (cityTest === false || cityValue.trim() === '') {
        setError("La ville renseignée n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (phoneNumberTest === false || phoneValue.trim() === '') {
        setError("La ville renseignée n'est pas valide !")
        setErrorBtn('errorBtn')
      } else {
        try {
          const userData = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue,
            phoneNumber: phoneValue,
            address: addressValue,
            zipCode: zipCodeValue,
            city: cityValue,
          }
          await userServices.createUser(userData)
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
          }
        }
      }
    }

    if (userData.id) {
      const orderData = {
        userId: userData.id,
        totalPrice: totalPrice,
        address: userData.address,
        zipCode: userData.zipCode,
        city: userData.city,
      }

      try {
        // await orderServices.postOrder(orderData)
        console.log('Panier validé')
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log('Veuillez vous connecter')
    }
  }

  const handleSubmitAddress = async (e) => {
    e.preventDefault()
    console.log('address submit')
    const addressValue = e.target['address'].value
    const zipCodeValue = e.target['zipCode'].value
    const cityValue = e.target['city'].value
    const phoneValue = e.target['phoneNumber'].value

    const addressTest = regexAddress.test(addressValue)
    const zipCodeTest = regexZipCode.test(zipCodeValue)
    const cityTest = regexCity.test(cityValue)
    const phoneNumberTest = regexPhone.test(phoneValue)

    console.log(addressValue, zipCodeValue, cityValue, phoneValue)

    if (addressTest === false || addressValue.trim() === '') {
      setError("L'adresse renseignée n'est pas valide !")
      setErrorBtn('errorBtn')
    } else if (zipCodeTest === false || zipCodeValue.trim() === '') {
      setError("Le code postal renseigné n'est pas valide !")
      setErrorBtn('errorBtn')
    } else if (cityTest === false || cityValue.trim() === '') {
      setError("La ville renseignée n'est pas valide !")
      setErrorBtn('errorBtn')
    } else if (phoneNumberTest === false || phoneValue.trim() === '') {
      setError("La ville renseignée n'est pas valide !")
      setErrorBtn('errorBtn')
    } else {
      try {
        const customerData = {
          phoneNumber: phoneValue,
          address: addressValue,
          zipCode: zipCodeValue,
          city: cityValue,
        }
        await userServices.editUser(userData.id, customerData)
        window.location.reload()
        setIsValidated(true)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div>
      {cartData && cartData.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          {isValidated && cartData && (
            <>
              {userData.id ? (
                <CustomerInfo
                  userData={userData}
                  onSubmit={handleSubmitAddress}
                />
              ) : (
                <>
                  {!isLogin && (
                    <div>
                      Déjà client ?{' '}
                      <p onClick={() => setIsLogin(true)}>
                        Cliquez ici pour vous connecter
                      </p>
                    </div>
                  )}
                  {isLogin && (
                    <>
                      <p>Connectez-vous</p>
                      <form action="" className="">
                        <SignInForm />
                        <button>Se connecter</button>
                      </form>
                    </>
                  )}
                  <BillingForm />
                </>
              )}
              <form action="" className="" onSubmit={handleOrderSubmit}>
                <CartDetails
                  cartData={cartData}
                  setTotalPrice={setTotalPrice}
                />
                <h3>Prix total : {totalPrice}€</h3>
                <button>Valider le panier</button>
              </form>
            </>
          )}
          {!isValidated && cartData && (
            <>
              <CartDetails cartData={cartData} setTotalPrice={setTotalPrice} />
              <h3>Prix total : {totalPrice}€</h3>
              <button onClick={handleCartSubmit}>Valider le panier</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Cart
