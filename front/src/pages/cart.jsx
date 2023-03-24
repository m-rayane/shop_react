import React, { useState, useEffect, useContext } from 'react'

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

import UserService from '../api/Services/UserServices'
import OrderService from '../api/Services/OrderServices'
import EmailService from '../api/Services/EmailServices'

import CartDetails from '../components/organisms/cartDetails'
import BillingForm from '../components/organisms/billingForm'
import CustomerInfo from '../components/organisms/customerInfo'
import Summary from '../components/organisms/summary'
import { SignInForm } from '../components/molecules/signInForm'

import { toLogin } from '../components/atoms/Services/authServices'
import { toHandleTestField } from '../components/atoms/Services/accountServices'

const Cart = () => {
  const {
    productsData,
    userData,
    usersEmails,
    shippingAddress,
    getShippingAddress,
    getProducts,
    targetCategory,
    targetAddress,
    errorMsg,
    setErrorMsg,
    shippingAddressChecked,
    selectedShippingAddress,
    setSelectedShippingAddress,
    cartData,
    setCartData,
    totalQuantity,
  } = useContext(Context)

  const [totalPrice, setTotalPrice] = useState(0)
  const [isValidated, setIsValidated] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isCreatingAnAccount, setIsCreatingAnAccount] = useState(false)
  const [errorBtn, setErrorBtn] = useState('')

  const selectedAddress = shippingAddress.find(
    (address) => address.id === targetAddress
  )
  const userServices = new UserService()
  const orderServices = new OrderService()
  const emailServices = new EmailService()

  const createAnAccount = document.getElementById('createAnAccount')

  useEffect(() => {
    setSelectedShippingAddress({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      zipCode: userData.zipCode,
      city: userData.city,
    })
  }, [userData, setSelectedShippingAddress])

  useEffect(() => {
    if (targetAddress !== null && shippingAddressChecked) {
      setSelectedShippingAddress(selectedAddress)
    } else {
      setSelectedShippingAddress({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        zipCode: userData.zipCode,
        city: userData.city,
      })
    }
  }, [
    selectedAddress,
    setSelectedShippingAddress,
    shippingAddressChecked,
    targetAddress,
    userData,
  ])

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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cart'))
    setCartData(data)
  }, [setCartData])

  const handleOrderSubmit = async () => {
    const newCartData = []
    if (cartData) {
      for (let i = 0; i < cartData.length; i++) {
        const productInCart = productsData.find(
          (p) => p._id === cartData[i].productId
        )
        if (productInCart) {
          const orderProduct = {
            productName: productInCart._name,
            productId: productInCart._id,
            quantity: cartData[i].quantity,
            price: productInCart._price,
          }
          newCartData.push(orderProduct)
        }
      }
    }
    if (userData.id && selectedShippingAddress) {
      console.log(newCartData)
      const orderData = {
        userId: userData.id,
        totalPrice: totalPrice,
        firstName: selectedShippingAddress.firstName,
        lastName: selectedShippingAddress.lastName,
        phoneNumber: selectedShippingAddress.phoneNumber,
        address: selectedShippingAddress.address,
        zipCode: selectedShippingAddress.zipCode,
        city: selectedShippingAddress.city,
        orderDetails: newCartData,
      }

      try {
        const response = await orderServices.postOrder(orderData)
        console.log('Panier validé')
        const emailDataAdmin = {
          from: 'nodemailer38@gmail.com',
          to: 'nodemailer38@gmail.com',
          subject: `Nouvelle commande - ${response.data.orderId}`,
          orderId: response.data.orderId,
          title: `Nouvelle commande n° ${response.data.orderId}`,
          text: `Une nouvelle commande a été passée avec succès. Le numéro de commande est : ${response.data.orderId}.`,
          orderStatus: 'submitted',
          orderDetails: newCartData,
        }
        const emailDataClient = {
          from: 'nodemailer38@gmail.com',
          to: userData.email,
          subject: `Confirmation de commande - ${response.data.orderId}`,
          title: `Nouvelle commande n° ${response.data.orderId}`,
          orderId: response.data.orderId,
          text: `Votre commande a été passée avec succès. Le numéro de commande est : ${response.data.orderId}.`,
          orderStatus: 'submitted',
          orderDetails: newCartData,
        }
        await Promise.all([
          emailServices.sendEmail(emailDataAdmin),
          emailServices.sendEmail(emailDataClient),
        ])
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
      {!cartData ? (
        <h1>Votre panier est vide.</h1>
      ) : (
        <>
          <section className="cart__leftSection">
            {!isValidated && cartData && (
              <CartDetails
                className="cart__leftSection__cartDetails"
                cartData={cartData}
                setTotalPrice={setTotalPrice}
                totalQuantity={totalQuantity}
              />
            )}
            {isValidated && cartData && (
              <>
                <CartDetails
                  className="cart__leftSection__cartDetails"
                  cartData={cartData}
                  setTotalPrice={setTotalPrice}
                />

                {userData.id ? (
                  <CustomerInfo
                    className="cart__leftSection__customerInfo"
                    userData={userData}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                    handleBlur={handleTestFields}
                    handleChange={() => setErrorMsg('')}
                    origin="cart"
                  />
                ) : (
                  <>
                    {!isLogin && (
                      <>
                        <div
                          className="cart__leftSection__customer"
                          onClick={() => setIsLogin(true)}
                        >
                          <p>Déjà client ?</p>
                          <p
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                          >
                            Cliquez ici pour vous connecter
                          </p>
                        </div>
                        <form
                          onSubmit={handleCreateAnAccount}
                          className="cart__leftSection__customer__billingForm"
                        >
                          <BillingForm
                            isCreating={isCreatingAnAccount}
                            handleChange={handleChangeCreatingAnAccount}
                            handleBlur={handleTestFields}
                            handleAddressFormChange={() => setErrorMsg('')}
                          />
                          <button>Créer un compte</button>
                        </form>
                      </>
                    )}
                    {isLogin && (
                      <div className="cart__leftSection__toConnect">
                        <div className="cart__leftSection__toConnect__title">
                          <p>Connectez-vous !</p>
                          <p
                            onClick={() => setIsLogin(false)}
                            style={{
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                          >
                            {' '}
                            Ou continuez...
                          </p>
                        </div>
                        <form onSubmit={handleLogin} className="">
                          <SignInForm />
                          <button>Se connecter</button>
                        </form>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </section>
          <section className="cart__rightSection">
            {cartData && (
              <Summary
                className="cart__rightSection__summary"
                totalPrice={totalPrice}
                isValidated={isValidated}
                handleCartSubmit={handleCartSubmit}
                handleOrderSubmit={handleOrderSubmit}
              />
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default Cart
