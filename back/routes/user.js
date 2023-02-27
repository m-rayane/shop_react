const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-users')

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.get('/users', userCtrl.getAllUsers)
router.get('/users/:id', userCtrl.getUserData)
router.put('/users/:id', auth, userCtrl.editUser)
router.put('/users/:id/shippingAddress', auth, userCtrl.addShippingAddress)
// router.delete('/users/:id', auth, multer, userCtrl.deleteUser);

module.exports = router
