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

router.post('/options', productCtrl.addOption)
router.get('/options', productCtrl.getAllOptions)
router.get('/options/:id', productCtrl.getOptionsByProduct)
router.put('/options/:id', productCtrl.updateOption)
router.delete('/options/:id', productCtrl.deleteOption)

router.post('/technicals', productCtrl.addTechnical)
router.get('/technicals/:id', productCtrl.getTechnicalsByProduct)
router.put('/technicals/:id', productCtrl.updateTechnical)
router.delete('/technicals/:id', productCtrl.deleteTechnical)

module.exports = router
