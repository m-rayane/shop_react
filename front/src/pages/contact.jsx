import '../utils/styles/contact.scss'

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { SignUpForm } from '../components/molecules/signUpForm'
import { FormField } from '../components/atoms/form/formField'
import { TextField } from '../components/atoms/form/textField'

import EmailService from '../api/Services/EmailServices'

import { Context } from '../utils/Context'

import { toHandleTestField } from '../components/atoms/Services/accountServices'

export default function Contact() {
  const emailServices = new EmailService()
  const navigate = useNavigate()
  const { userData, targetCategory, setTargetCategory, accountCategories } =
    useContext(Context)
  const [contactValue, setContactValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [confirmMessage, setConfirmMessage] = useState('')
  const [messageSent, setMessageSent] = useState(false)

  const submitContactForm = async (e) => {
    e.preventDefault()
    try {
      console.log('Panier validé')
      const emailDataAdmin = {
        from: 'nodemailer38@gmail.com',
        to: 'christelle.veyret38@gmail.com',
        subject: `Message d'un client : ${e.target['firstName'].value} ${e.target['lastName'].value}`,
        title: `Voici le message de ${e.target['firstName'].value} ${e.target['lastName'].value}`,
        text: e.target['contactMessage'].value,
        customerEmail: e.target['signUpEmail'].value,
        customerFirstName: e.target['firstName'].value,
        customerLastName: e.target['lastName'].value,
        customerPhoneNumber: e.target['contactPhoneNumber'].value,
        orderStatus: 'contact',
      }
      console.log(emailDataAdmin)
      await emailServices.sendEmail(emailDataAdmin)
      setMessageSent(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmitErrorMsg = (errorMsg) => {
    setErrorMsg(errorMsg)
  }

  const handleTextareaChange = (e) => {
    setContactValue(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const handleTestFields = () => {
    toHandleTestField(targetCategory.category, targetCategory.message, {
      errorMsg: handleSubmitErrorMsg,
    })
  }

  const handleChange = async () => {
    console.log(targetCategory)
    setErrorMsg('')
  }

  return (
    <div className="contact">
      {!messageSent && (
        <>
          <h1>contactez nous</h1>
          <form onSubmit={submitContactForm} className="contact_form">
            <SignUpForm
              defaultValue={{
                firstName: userData ? userData.firstName : '',
                lastName: userData ? userData.lastName : '',
                email: userData ? userData.email : '',
              }}
              handleBlur={handleTestFields}
              handleChange={handleChange}
            />
            <FormField
              name="contactPhoneNumber"
              type="phone"
              placeholder="Téléphone"
              defaultValue={userData ? userData.phoneNumber : ''}
              // onBlur={handleTestFields}
              // onChange={handleChange}
              // onFocus={() =>
              //   setTargetCategory(
              //     accountCategories.contact.find(
              //       (item) => item.category === 'contactPhoneNumber'
              //     )
              //   )
              // }
            />
            <TextField
              name="contactMessage"
              children="Votre question*"
              onChange={(e) => handleTextareaChange(e)}
              onBlur={handleTestFields}
              onFocus={() =>
                setTargetCategory(
                  accountCategories.contact.find(
                    (item) => item.category === 'contactMessage'
                  )
                )
              }
            />
            <button>Envoyer</button>
            <p className={`contact__form__message`}>* champs obligatoires</p>
            {errorMsg && (
              <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>
            )}
            {confirmMessage && (
              <p style={{ color: 'green', textAlign: 'center' }}>
                {confirmMessage}
              </p>
            )}
          </form>
        </>
      )}
      {messageSent && (
        <>
          <h2 style={{ color: 'rgb(0,222,0)' }}>
            Votre message à bien été envoyé !
          </h2>
          <Link to="/">
            <h4 style={{ textDecoration: 'underline', color: 'white' }}>
              Revenir à la page d'accueil ...
            </h4>
          </Link>
        </>
      )}
    </div>
  )
}
