import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../utils/Context'

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

import CartDetails from '../components/organisms/cartDetails'
import BillingForm from '../components/organisms/billingForm'
import CustomerInfo from '../components/organisms/customerInfo'
import { SignInForm } from '../components/molecules/signInForm'

import { toLogin } from '../components/atoms/Services/authServices'
import {
  toAddShippingAddress,
  toHandleTestField,
} from '../components/atoms/Services/accountServices'

const Cart = () => {
  const {
    productsData,
    userData,
    usersEmails,
    shippingAddress,
    getShippingAddress,
    getProducts,
    accountCategories,
    targetCategory,
    getUser,
  } = useContext(Context)
  const [cartData, setCartData] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [isValidated, setIsValidated] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isCreatingAnAccount, setIsCreatingAnAccount] = useState(false)
  const [shippingAddressChecked, setShippingAddressChecked] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [errorBtn, setErrorBtn] = useState('')
  const [targetAddress, setTargetAddress] = useState()
  const [selectedShippingAddress, setSelectedShippingAddress] = useState()

  const selectedAddress = shippingAddress.find(
    (address) => address.id === targetAddress
  )
  const orderServices = new OrderServices()
  const userServices = new UserService()
  const navigate = useNavigate()

  const createAnAccount = document.getElementById('createAnAccount')

  useEffect(() => {
    setSelectedShippingAddress({
      address: userData.address,
      zipCode: userData.zipCode,
      city: userData.city,
    })
  }, [userData])

  useEffect(() => {
    if (targetAddress !== null && shippingAddressChecked) {
      setSelectedShippingAddress(selectedAddress)
    } else {
      setSelectedShippingAddress({
        address: userData.address,
        zipCode: userData.zipCode,
        city: userData.city,
      })
    }
  }, [selectedAddress, targetAddress, shippingAddressChecked, userData])

  useEffect(() => {}, [selectedAddress, targetAddress])

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

  function handleChangeCreatingAnAccount() {
    setIsCreatingAnAccount(!isCreatingAnAccount)
  }

  const handleCreateAnAccount = async (e) => {
    e.preventDefault()
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

      const isEmail = usersEmails.find((user) => user.email === emailValue)
      isEmail ? setErrorMsg('Email already exist') : console.log('email ok')

      if (firstNameTest === false || firstNameValue.trim() === '') {
        setErrorMsg("Le prénom n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (lastNameTest === false || lastNameValue.trim() === '') {
        setErrorMsg("Le nom n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (emailTest === false || emailValue.trim() === '') {
        setErrorMsg("L'adresse email n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (passwordTest === false || passwordValue.trim() === '') {
        setErrorMsg(
          "Le mot de passe choisi n'est pas valide. Il doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule et un chiffre. Les caractères spéciaux suivants ! @ # $ % ^ & * sont également authorisés."
        )
        setErrorBtn('errorBtn')
      } else if (passwordTest === false || passwordValue.trim() === '') {
        setErrorMsg('Le mot de passe ne correspond pas !')
        setErrorBtn('errorBtn')
      } else if (addressTest === false || addressValue.trim() === '') {
        setErrorMsg("L'adresse renseignée n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (zipCodeTest === false || zipCodeValue.trim() === '') {
        setErrorMsg("Le code postal renseigné n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (cityTest === false || cityValue.trim() === '') {
        setErrorMsg("La ville renseignée n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (phoneNumberTest === false || phoneValue.trim() === '') {
        setErrorMsg("La ville renseignée n'est pas valide !")
        setErrorBtn('errorBtn')
      } else if (isEmail) {
        setErrorMsg('Un compte avec cette adresse email existe déjà !')
        console.log('Un compte avec cette adresse email existe déjà !')
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
            getProducts()
          }
        }
      }
    }
  }

  const handleSubmitErrorMsg = (errorMsg) => {
    setErrorMsg(errorMsg)
  }

  const handleAddBillingAddress = async (e) => {
    toAddShippingAddress(
      e,
      accountCategories.billing,
      userData,
      {
        errorMsg: handleSubmitErrorMsg,
      },
      'billing'
    )
    console.log(getUser(userData.id))
    getUser(userData.id)
  }

  const handleAddShippingAddress = async (e) => {
    toAddShippingAddress(
      e,
      accountCategories.shipping,
      userData,
      {
        errorMsg: handleSubmitErrorMsg,
      },
      'shipping'
    )
    getShippingAddress()
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [])

  const handleOrderSubmit = async () => {
    const newCartData = []
    if (cartData) {
      for (let i = 0; i < cartData.length; i++) {
        const productInCart = productsData.find(
          (p) => p._id === cartData[i].productId
        )
        if (productInCart) {
          const orderProduct = {
            productId: productInCart._id,
            quantity: cartData[i].quantity,
            price: productInCart._price,
          }
          newCartData.push(orderProduct)
        }
      }
    }
    if (userData.id && selectedShippingAddress) {
      const orderData = {
        userId: userData.id,
        totalPrice: totalPrice,
        address: selectedShippingAddress.address,
        zipCode: selectedShippingAddress.zipCode,
        city: selectedShippingAddress.city,
        orderDetails: newCartData,
      }
      console.log(orderData)

      try {
        await orderServices.postOrder(orderData)
        console.log('Panier validé')
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log('Veuillez choisir une adresse de livraison. ')
    }
  }

  //to submit login
  const handleLogin = async (e) => {
    toLogin(e, 'cart')
    getShippingAddress()
  }

  const handleTestFields = () => {
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
    <div className="cart">
      {cartData && cartData.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          {isValidated && cartData && (
            <>
              {userData.id ? (
                <CustomerInfo
                  userData={userData}
                  shippingAddress={shippingAddress}
                  onSubmitBillingAddress={handleAddBillingAddress}
                  onSubmitShippingAddress={handleAddShippingAddress}
                  targetAddress={targetAddress}
                  setTargetAddress={setTargetAddress}
                  isChecked={shippingAddressChecked}
                  setIsChecked={setShippingAddressChecked}
                  errorMsg={errorMsg}
                  handleBlur={handleTestFields}
                  categories={accountCategories}
                  handleChange={() => setErrorMsg('')}
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
                      <form onSubmit={handleLogin} className="">
                        <SignInForm />
                        <button>Se connecter</button>
                      </form>
                    </>
                  )}
                  <form onSubmit={handleCreateAnAccount} className="">
                    <BillingForm
                      isCreating={isCreatingAnAccount}
                      handleChange={handleChangeCreatingAnAccount}
                    />
                    <button>Créer un compte</button>
                  </form>
                </>
              )}

              <CartDetails cartData={cartData} setTotalPrice={setTotalPrice} />
              <h3>Prix total : {totalPrice}€</h3>
            </>
          )}
          {!isValidated && cartData && (
            <>
              <CartDetails cartData={cartData} setTotalPrice={setTotalPrice} />
              <h3>Prix total : {totalPrice}€</h3>
              <button onClick={handleCartSubmit}>Valider la commande</button>
            </>
          )}
          {isValidated && cartData && (
            <>
              <button onClick={handleOrderSubmit}>Commander</button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Cart
