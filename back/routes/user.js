const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-users')

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/users', auth, userCtrl.getAllUsers)
router.get('/users/emails', userCtrl.getAllEmails)
router.get('/users/:id', userCtrl.getUserData)
router.put('/users/:id', auth, userCtrl.editUser)
router.post('/shipping_address/:id', auth, userCtrl.addShippingAddress)
router.get('/shipping_address', auth, userCtrl.getAllAddress)
router.get('/shipping_address/:id', auth, userCtrl.getShippingAddress)
// router.delete('/users/:id', auth, multer, userCtrl.deleteUser);

module.exports = router
