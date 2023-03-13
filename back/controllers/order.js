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
  console.log(req.body)
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

// créer un objet Date pour la date et l'heure actuelles
// const dateObj = new Date();

// convertir en chaîne DATETIME SQL
// const datetimeValue = dateObj.toISOString().slice(0, 19).replace('T', ' ');

exports.createOrder_ = (req, res) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    const date = new Date(Date.now())
    const order = new Order({
      id: `J${date
        .toLocaleString()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '')}`,
      userId: req.body.userId,
      statut: 'en attente de validation',
      totalPrice: req.body.totalPrice,
      shippingAddress: `${req.body.address}, ${req.body.zipCode} - ${req.body.city}`,
    })

    dbConnection.query('INSERT INTO orders SET ?', order, (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(201).json({ message: 'Order created !' })
    })
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.createOrder = (req, res) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    console.log(req.body)
    const date = new Date(Date.now())
    const order = new Order({
      id: `J${date
        .toLocaleString()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '')}`,
      userId: req.body.userId,
      statut: 'en attente de validation',
      totalPrice: req.body.totalPrice,
      shippingAddress: `${req.body.address}, ${req.body.zipCode} - ${req.body.city}`,
    })
    const orderDetails = req.body.orderDetails

    dbConnection.beginTransaction((err) => {
      if (err) {
        return res.status(500).send('Transaction failed to begin')
      }
      dbConnection.query('INSERT INTO orders SET ?', order, (err, result) => {
        if (err) return res.status(500).json(err)
        res.status(201).json({ message: 'Order created !' })
        if (Array.isArray(orderDetails) && orderDetails.length > 0) {
          for (let detail of orderDetails) {
            const query =
              'INSERT INTO order_details (orderId, productId, quantity, priceUnit) VALUES (?, ?, ?, ?)'
            dbConnection.query(
              query,
              [order.id, detail.productId, detail.quantity, detail.price],
              (error, results, fields) => {
                if (error) throw error
                console.log(
                  `Détail de commande inséré avec succès pour le produit ${detail.productId}`
                )
              }
            )
          }
        } else {
          dbConnection.commit((err) => {
            if (err)
              return res.status(500).json(err).send('Transaction commit failed')

            res.status(201).send('Order created successfully')
          })
        }
      })
    })
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.editOrder = (req, res, next) => {
  if (req.auth.role === 'admin') {
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
