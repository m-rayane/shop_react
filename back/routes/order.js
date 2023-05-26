const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const orderCtrl = require('../controllers/order')
const paymentCtrl = require('../controllers/stripe')

router.get('/orders', auth, orderCtrl.getAllOrders)
router.post('/orders', auth, orderCtrl.createOrder)
router.get('/orders/:id/detailsByUser', auth, orderCtrl.getOrderDetailByUser)
router.get('/orders/:id/detailsByOrder', auth, orderCtrl.getOrderDetailByOrder)
router.get('/orders/:id', auth, orderCtrl.getOrdersByUser)
router.put('/orders/:id', auth, orderCtrl.editOrder)
router.delete('/orders/:id', auth, orderCtrl.deleteOrder)

router.post('/payments', paymentCtrl.payment)
router.post('/paymentIntents', paymentCtrl.createPaymentIntent)

router.post('/shippingCosts', orderCtrl.createShippingCosts)
router.get('/shippingCosts', orderCtrl.getShippingCosts)

module.exports = router
