const dbConnection = require('../db/mysql.js')
const Order = require('../models/Order')
const fs = require('fs')

const randomNumber = Math.floor(Math.random() * 900) + 100

exports.getAllOrders = (req, res, next) => {
  dbConnection.query('SELECT * FROM orders', (err, result) => {
    if (err) return res.status(500).json(err)
    if (result == 0) return res.status(404).json([])
    res.status(200).json(result)
  })
}

exports.getOneOrder = (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM orders WHERE id ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result === 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}

exports.createOrder = (req, res) => {
  const date = new Date(Date.now())
  const order = new Order({
    id: `J${date.toLocaleDateString().split('/').join('')}${randomNumber}`,
    userId: req.body.userId,
    statut: 'en attente de validation',
    totalPrice: req.body.totalPrice,
    shippingAddress: `${req.body.address}, ${req.body.zipCode} - ${req.body.city}`,
    shippingDate: '',
    updatedDate: Date.now(),
  })

  dbConnection.query('INSERT INTO orders SET ? ', order, (err, result) => {
    if (err) return res.status(500).json(err)
    res.status(201).json({ message: 'Order created !' })
  })
}

exports.editOrder = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    const orderData = req.body.content
    if (req.body.oldImage !== 'default' && req.file) {
      const filename = req.body.oldImage.split('/images/orders')[1]
      fs.unlink(`images/orders/${filename}`, () => {
        dbConnection.query(
          'UPDATE orders SET ? WHERE orderId = ?',
          [orderData, req.params.id],
          (err, result) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json({ message: 'Updated order !' })
          }
        )
      })
    } else if (req.body.oldImage === 'default' && req.file) {
      dbConnection.query(
        'UPDATE orders SET ? WHERE orderId = ?',
        [orderData, req.params.id],
        (err, result) => {
          if (err) return res.status(500).json(err)
          return res.status(200).json({ message: 'Updated order !' })
        }
      )
    } else {
      dbConnection.query(
        'UPDATE orders SET ? WHERE orderId = ?',
        [orderData, req.params.id],
        (err, result) => {
          if (err) return res.status(500).json(err)
          return res.status(200).json({ message: 'Updated order !' })
        }
      )
    }
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.deleteOrder = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    dbConnection.query(
      'SELECT * FROM orders WHERE orderId = ?',
      req.params.id,
      (err, result) => {
        if (err) return res.status(500).json(err)
        else {
          const filename = result[0].image.split('/images/orders/')[1]
          fs.unlink(`images/orders/${filename}`, () => {
            dbConnection.query(
              'DELETE FROM orders WHERE orderId = ?',
              req.params.id,
              (err, result) => {
                if (err) return res.status(500).json(err)
                res.status(200).json({ message: 'Order deleted !' })
              }
            )
          })
        }
      }
    )
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}
