const dbConnection = require('../db/mysql.js')
const Product = require('../models/Product')
const fs = require('fs')

const randomNumber = Math.floor(Math.random() * 900) + 100

// to get all products to display on all product page
exports.getAllProducts = (req, res, next) => {
  dbConnection.query('SELECT * FROM products', (err, result) => {
    if (err) return res.status(500).json(err)
    if (result == 0) return res.status(404).json([])
    res.status(200).json(result)
  })
}

// to get one product to display on single product page
exports.getOneProduct = (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM products WHERE id ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result === 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}

// to create a product
exports.createProduct = (req, res) => {
  console.log(req.body)
  const brand = req.body.brand.split(' ').join('').substring(0, 1).toUpperCase()
  const model = req.body.model.split(' ').join('').substring(0, 3).toUpperCase()
  const date = new Date(Date.now())
  const product = new Product({
    id:
      brand +
      model +
      date.toLocaleDateString().split('/').join('') +
      randomNumber,
    name: req.body.name,
    description: req.body.description,
    technical: req.body.technical,
    price: req.body.price,
    weight: req.body.weight,
    brand: req.body.brand,
    model: req.body.model,
    category: req.body.category,
    stock: req.body.stock,
    image: req.file
      ? `${req.protocol}://${req.get('host')}/images/products/${
          req.file.filename
        }`
      : 'default',
  })

  dbConnection.query('INSERT INTO products SET ? ', product, (err, result) => {
    if (err) return res.status(500).json(err)
    res.status(201).json({ message: 'Product created !' })
  })
}

//  to edit a product
exports.editProduct = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    const productData = req.file
      ? {
          image: `${req.protocol}://${req.get('host')}/images/products/${
            req.file.filename
          }`,
          content: req.body.content,
        }
      : {
          content: req.body.content,
        }
    if (req.body.oldImage !== 'default' && req.file) {
      const filename = req.body.oldImage.split('/images/products')[1]
      fs.unlink(`images/products/${filename}`, () => {
        dbConnection.query(
          'UPDATE products SET ? WHERE productId = ?',
          [productData, req.params.id],
          (err, result) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json({ message: 'Updated product !' })
          }
        )
      })
    } else if (req.body.oldImage === 'default' && req.file) {
      dbConnection.query(
        'UPDATE products SET ? WHERE productId = ?',
        [productData, req.params.id],
        (err, result) => {
          if (err) return res.status(500).json(err)
          return res.status(200).json({ message: 'Updated product !' })
        }
      )
    } else {
      dbConnection.query(
        'UPDATE products SET ? WHERE productId = ?',
        [productData, req.params.id],
        (err, result) => {
          if (err) return res.status(500).json(err)
          return res.status(200).json({ message: 'Updated product !' })
        }
      )
    }
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

//to delete a product
exports.deleteProduct = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    dbConnection.query(
      'SELECT * FROM products WHERE productId = ?',
      req.params.id,
      (err, result) => {
        if (err) return res.status(500).json(err)
        else {
          const filename = result[0].image.split('/images/products/')[1]
          fs.unlink(`images/products/${filename}`, () => {
            dbConnection.query(
              'DELETE FROM products WHERE productId = ?',
              req.params.id,
              (err, result) => {
                if (err) return res.status(500).json(err)
                res.status(200).json({ message: 'Product deleted !' })
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

// to add an option
exports.addOption = (req, res) => {
  const option = { ...req.body }
  dbConnection.query(
    'INSERT INTO product_options SET ? ',
    option,
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(201).json({ message: 'Product created !' })
    }
  )
}

// to get option of product page
exports.getOption = (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM product_options WHERE productId = ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result === 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}
