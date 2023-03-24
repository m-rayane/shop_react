const express = require('express')
const emailCtrl = require('../controllers/email')

const router = express.Router()

router.post('/emails', emailCtrl.sendEmail)

module.exports = router
