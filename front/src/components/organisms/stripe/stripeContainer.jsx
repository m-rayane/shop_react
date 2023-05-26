import { useContext, useEffect } from 'react'

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { Context } from '../../../utils/Context'
import OrderService from '../../../api/Services/OrderServices'

import CheckoutForm from './checkoutForm'

const PUBLIC_KEY =
  'pk_test_51MuWtXDJJJqKXEszR8PnOkOONxm2PQdCCQg9FN0O8Yej5jctJOZ1h8MVRdYPsaffN4lni5EkK8aQ3wgmpTZnTyLc008MW9y90N'

const stripePromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ amount, onPaymentSuccess }) {
  const { clientSecret, setClientSecret, userData, setOrderId } =
    useContext(Context)

  useEffect(() => {
    const getPaymentIntent = async () => {
      const paymentData = {
        amount: amount,
        description: {
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
      }
      const orderServices = new OrderService()
      const response = await orderServices.paymentIntent(paymentData)
      console.log(response.data)
      setClientSecret(response.data.client_secret)
    }
    getPaymentIntent()
  }, [amount, setClientSecret, userData])

  const options = {
    clientSecret: clientSecret,
    appearance: {
      /*...*/
    },
  }
  return (
    <>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm amount={amount} onPaymentSuccess={onPaymentSuccess} />
        </Elements>
      )}
    </>
  )
}
