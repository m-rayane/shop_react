const dbConnection = require('../db/mysql.js')
const Order = require('../models/Order')
const fs = require('fs')

const randomNumber = Math.floor(Math.random() * 900) + 100

exports.getAllOrders = (req, res, next) => {
  dbConnection.query('SELECT * FROM orders', (err, result) => {
    if (err) return res.status(500).json(err)
    if (result == 0)
      return res.status(404).json({ message: 'Orders not found !' })
    res.status(200).json(result)
  })
}

exports.getOrdersByUser = (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM orders WHERE userId = ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0)
        return res.status(404).json({ message: 'Orders not found !' })
      res.status(200).json(result)
    }
  )
}

exports.getOrderDetailByUser = (req, res, next) => {
  console.log(req.params)
  dbConnection.query(
    'SELECT * FROM order_details WHERE userId = ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0)
        return res
          .status(404)
          .json({ message: 'Order details bye userId not found !' })
      res.status(200).json(result)
    }
  )
}

exports.getOrderDetailByOrder = (req, res, next) => {
  console.log(req.params)
  dbConnection.query(
    'SELECT * FROM order_details WHERE orderId = ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0)
        return res
          .status(404)
          .json({ message: 'Order details by orderId not found !' })
      res.status(200).json(result)
    }
  )
}

// créer un objet Date pour la date et l'heure actuelles
// const dateObj = new Date();

// convertir en chaîne DATETIME SQL
// const datetimeValue = dateObj.toISOString().slice(0, 19).replace('T', ' ');

exports.createOrder = (req, res) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    dbConnection.beginTransaction((err) => {
      if (err) {
        return res.status(500).send('Transaction failed to begin')
      }
      const date = new Date(Date.now())
      const order = new Order({
        id: `J${date
          .toLocaleString()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '')}`,
        userId: req.body.userId,
        status: 'en attente de validation',
        totalPrice: req.body.totalPrice,
        shippingName: `${req.body.firstName} ${req.body.lastName}`,
        shippingPhone: `${req.body.phoneNumber}`,
        shippingAddress: `${req.body.address}, ${req.body.zipCode} ${req.body.city}`,
      })
      dbConnection.query('INSERT INTO orders SET ?', order, (err, result) => {
        if (err) return res.status(500).json(err)
        const orderDetails = req.body.orderDetails
        if (Array.isArray(orderDetails) && orderDetails.length > 0) {
          const values = orderDetails.map((detail) => [
            order.userId,
            order.id,
            detail.productId,
            detail.quantity,
            detail.price,
          ])
          const query =
            'INSERT INTO order_details (userId, orderId, productId, quantity, priceUnit) VALUES ?'
          dbConnection.query(query, [values], (error, results, fields) => {
            if (error) throw error
            console.log('Order details created successfully')
          })
        }
        dbConnection.commit((err) => {
          if (err) {
            dbConnection.rollback(() => {
              throw err
            })
          }
          res
            .status(201)
            .send({ orderId: order.id, message: 'Order created successfully' })
        })
      })
    })
  }
}

exports.editOrder = (req, res, next) => {
  if (req.auth.role === 'admin') {
    const orderData = { ...req.body }
    dbConnection.query(
      'UPDATE orders SET ? WHERE id = ?',
      [orderData, req.params.id],
      (err, result) => {
        if (err) return res.status(500).json(err)
        return res
          .status(200)
          .send({ orderId: req.params.id, message: 'Updated order !' })
      }
    )
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.deleteOrder = (req, res, next) => {
  if (req.auth.role === 'admin') {
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
