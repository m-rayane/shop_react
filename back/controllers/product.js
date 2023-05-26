const dbConnection = require('../db/mysql.js')
const Product = require('../models/Product')
const fs = require('fs')

const randomNumber = Math.floor(Math.random() * 900) + 100

// to get all products to display on all product page
exports.getAllProducts = (req, res, next) => {
  dbConnection.query('SELECT * FROM products ORDER BY name', (err, result) => {
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
    shortDescription: req.body.shortDescription,
    description: req.body.description,
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
    const technicalData = JSON.parse(req.body.technicalData)
    if (Array.isArray(technicalData) && technicalData.length > 0) {
      const values = technicalData.map((tech) => [
        product.id,
        tech.technicalRank,
        tech.content,
        tech.category,
      ])
      console.log(values)
      const query =
        'INSERT INTO product_technicals (productId, technicalRank, content, category) VALUES ?'
      dbConnection.query(query, [values], (error, results, fields) => {
        if (error) throw error
        console.log('Technicals product created successfully')
      })
    }
    const optionData = JSON.parse(req.body.optionData)
    if (Array.isArray(optionData) && optionData.length > 0) {
      const values = optionData.map((option) => [
        product.id,
        option.name,
        option.description,
        option.price,
      ])
      console.log(values)
      const query =
        'INSERT INTO product_options (productId, name, description, price) VALUES ?'
      dbConnection.query(query, [values], (error, results, fields) => {
        if (error) throw error
        console.log('Options product created successfully')
      })
    }
    dbConnection.commit((err) => {
      if (err) {
        dbConnection.rollback(() => {
          throw err
        })
      }
      res.status(201).send({ message: 'product created successfully' })
    })
  })
}

exports.editProduct = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    console.log(req.body)
    console.log(req.file)
    console.log(req.body.oldImage.split('/images/products')[1])
    const productId = req.body.productId
    const editedProduct = {
      name: req.body.name,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
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
        : req.body.oldImage,
    }
    if (req.body.oldImage && req.file) {
      const filename = req.body.oldImage.split('/images/products')[1]
      fs.unlink(`images/products/${filename}`, () => {
        dbConnection.query(
          'UPDATE products SET ? WHERE id = ?',
          [editedProduct, req.params.id],
          (err, result) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json({ message: 'Updated product !' })
          }
        )
      })
    } else {
      dbConnection.query(
        'UPDATE products SET ? WHERE id = ?',
        [editedProduct, req.params.id],
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

// exports.editProduct = (req, res) => {
//   console.log(req.body)
//   const productId = req.body.productId
//   const product = {
//     name: req.body.name,
//     shortDescription: req.body.shortDescription,
//     description: req.body.description,
//     price: req.body.price,
//     weight: req.body.weight,
//     brand: req.body.brand,
//     model: req.body.model,
//     category: req.body.category,
//     stock: req.body.stock,
//   }
//   dbConnection.beginTransaction((err) => {
//     if (err) {
//       return res.status(500).json(err)
//     }
//     dbConnection.query(
//       'UPDATE products SET ? WHERE id = ?',
//       [product, productId],
//       (err, result) => {
//         if (err) {
//           dbConnection.rollback(() => {
//             throw err
//           })
//         }
//         // add technical data
//         if (req.body.technicalData) {
//           const technicalData = JSON.parse(req.body.technicalData)
//           if (Array.isArray(technicalData) && technicalData.length > 0) {
//             const values = technicalData.map((technical) => [
//               productId,
//               technical.technicalRank,
//               technical.content,
//               technical.category,
//             ])
//             dbConnection.query(
//               'INSERT INTO product_technicals (productId, technicalRank, content, category) VALUES ?',
//               [values],
//               (error, results, fields) => {
//                 if (error) {
//                   dbConnection.rollback(() => {
//                     throw error
//                   })
//                 }
//                 console.log('Technicals product created successfully')
//               }
//             )
//           }
//         }
//         //add product option
//         if (req.body.optionData) {
//           const optionData = JSON.parse(req.body.optionData)
//           if (Array.isArray(optionData) && optionData.length > 0) {
//             const optionValues = optionData.map((option) => [
//               productId,
//               option.name,
//               option.description,
//               option.price,
//             ])
//             dbConnection.query(
//               'INSERT INTO product_options (productId, name, description, price) VALUES ?',
//               [optionValues],
//               (error, results, fields) => {
//                 if (error) {
//                   dbConnection.rollback(() => {
//                     res.status(500).json({ error: err.message })
//                   })
//                 }
//                 console.log('Product options created successfully')
//               }
//             )
//           }
//         }
//         dbConnection.commit((err) => {
//           if (err) {
//             dbConnection.rollback(() => {
//               throw err
//             })
//           }
//           res.status(201).send({ message: 'Product updated successfully' })
//         })
//       }
//     )
//   })
// }

//to delete a product
exports.deleteProduct = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    dbConnection.query(
      'SELECT * FROM products WHERE id = ?',
      req.params.id,
      (err, result) => {
        if (err) return res.status(500).json(err)
        else {
          const filename = result[0].image.split('/images/products/')[1]
          fs.unlink(`images/products/${filename}`, () => {
            dbConnection.query(
              'DELETE FROM products WHERE id = ?',
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

// to add a technical
exports.addTechnical = (req, res) => {
  const option = { ...req.body }
  dbConnection.query(
    'INSERT INTO product_technicals SET ? ',
    option,
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(201).json({ message: 'Technical created !' })
    }
  )
}

// to get all technical description by product
exports.getTechnicalsByProduct = (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM product_technicals WHERE productId = ? ORDER BY category,technicalRank',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}

// to update technical description by product
exports.updateTechnical = (req, res, next) => {
  const data = { ...req.body }
  dbConnection.query(
    'UPDATE product_technicals SET ? WHERE id = ?',
    [data, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}

// to delete a technical description by product
exports.deleteTechnical = (req, res, next) => {
  dbConnection.query(
    'DELETE FROM product_technicals WHERE id = ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}

// to add an option
exports.addOption = (req, res) => {
  const option = { ...req.body }
  dbConnection.query(
    'INSERT INTO product_options SET ? ',
    option,
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.status(201).json({ message: 'Option created !' })
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

// to get all options
exports.getAllOptions = (req, res, next) => {
  dbConnection.query('SELECT * FROM product_options', (err, result) => {
    if (err) return res.status(500).json(err)
    if (result == 0) return res.status(404).json([])
    res.status(200).json(result)
  })
}

// to get all option description by product
exports.getOptionsByProduct = (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM product_options WHERE productId = ? ORDER BY id',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}

// to update technical description by product
exports.updateOption = (req, res, next) => {
  const data = { ...req.body }
  dbConnection.query(
    'UPDATE product_options SET ? WHERE id = ?',
    [data, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}

// to delete an option description
exports.deleteOption = (req, res, next) => {
  dbConnection.query(
    'DELETE FROM product_options WHERE id = ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0) return res.status(404).json([])
      res.status(200).json(result)
    }
  )
}
