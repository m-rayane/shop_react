const dotenv = require('dotenv')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
dotenv.config()

exports.createPaymentIntent = async (req, res, next) => {
  console.log(req.body)
  const { amount, description } = req.body
  await stripe.paymentIntents
    .create({
      amount: amount,
      currency: 'eur',
      description: `${description.firstName} ${description.lastName}`,
      automatic_payment_methods: { enabled: true },
    })
    .then((paymentIntent) => {
      res.json({
        client_secret: paymentIntent.client_secret,
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}

exports.payment = async (req, res, next) => {
  const { amount, id, description } = req.body
  await stripe.paymentIntents
    .create({
      amount: amount,
      currency: 'eur',
      description: description,
      payment_method_types: ['card'],
      payment_method: id,
      metadata: { integration_check: 'accept_a_payment' },
      confirm: true,
    })
    .then((paymentIntent) => {
      res.json({ client_secret: paymentIntent.client_secret })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message })
    })
}
