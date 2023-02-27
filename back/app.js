const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type', 'Authorization'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}

const path = require('path')
const multer = require('multer')
const upload = multer()
const dotenv = require('dotenv')
dotenv.config()
const helmet = require('helmet')

const apiRoute = '/api'
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const orderRoutes = require('./routes/order')

const app = express()

// app.use(upload.array())

app.use('/form-data', (req, res) => {
  console.log(`\nform-data ->> ${JSON.stringify(req.body)}`)
  res.send(req.body)
})

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app
