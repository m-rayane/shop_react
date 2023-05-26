import React, { useContext } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'

import { Context } from '../../../utils/Context'
import OrderService from '../../../api/Services/OrderServices'

export default function CheckoutForm({ amount, onPaymentSuccess }) {
  const { orderId, userData, setClientSecret } = useContext(Context)
  const stripe = useStripe()
  const elements = useElements()

  const orderServices = new OrderService()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    const paymentData = {
      amount: amount,
      description: {
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    }
    const response = await orderServices.paymentIntent(paymentData)
    console.log(response)
    try {
      const { error, paymentIntent: confirmedPaymentIntent } =
        await stripe.confirmPayment({
          elements,
          payment_method: {
            type: 'card',
            card: elements.getElement(PaymentElement),
          },
          redirect: 'if_required',
        })

      if (error) {
        console.log(error.message)
      } else {
        console.log(confirmedPaymentIntent)
        // Le paiement a été confirmé avec succès
        onPaymentSuccess()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement stripe={stripe} elements={elements} />
      <button type="submit" disabled={!stripe}>
        Payer
      </button>
    </form>
  )
}
