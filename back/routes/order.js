const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const orderCtrl = require('../controllers/order')

router.get('/orders', auth, orderCtrl.getAllOrders)
router.post('/orders', auth, orderCtrl.createOrder)
router.get('/orders/:id/detailsByUser', auth, orderCtrl.getOrderDetailByUser)
router.get('/orders/:id/detailsByOrder', auth, orderCtrl.getOrderDetailByOrder)
router.get('/orders/:id', auth, orderCtrl.getOrdersByUser)
router.put('/orders/:id', auth, orderCtrl.editOrder)
router.delete('/orders/:id', auth, orderCtrl.deleteOrder)

module.exports = router
