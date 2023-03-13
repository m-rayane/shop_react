const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-products')

const productCtrl = require('../controllers/product')

router.get('/products', productCtrl.getAllProducts)
router.post('/products', auth, multer, productCtrl.createProduct)
router.get('/products/:id', productCtrl.getOneProduct)
router.put('/products/:id', auth, multer, productCtrl.editProduct)
router.delete('/products/:id', auth, productCtrl.deleteProduct)
router.post('/products/:id/options', auth, productCtrl.addOption)
router.get('/products/:id/options', auth, productCtrl.getOption)

module.exports = router
