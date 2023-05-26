const dbConnection = require('../db/mysql.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config()

const User = require('../models/User.js')

const tokenExpiresIn = 24 * 60 * 60 * 1000

// to signup a new user
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        ...req.body,
        password: hash,
        role: 'user',
      })
      dbConnection.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) res.status(400).json({ error: 'Email already existed !' })
        else res.status(201).json({ message: 'user is successfully created !' })
      })
    })
    .catch((error) => res.status(500).json({ error }))
}

// to login
exports.login = (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM users WHERE email = ?',
    req.body.email,
    (err, result) => {
      if (err) return res.status(500).json(err)
      else {
        if (result == 0) {
          return res
            .status(404)
            .json({ error: "Password doesn't match with email." })
        } else {
          bcrypt
            .compare(req.body.password, result[0].password)
            .then((valid) => {
              if (!valid) {
                return res
                  .status(401)
                  .json({ error: "Password doesn't match with email." })
              }
              const createdToken = jwt.sign(
                { userId: result[0].id, role: result[0].role },
                process.env.ACCESS_SECRET_TOKEN,
                { expiresIn: '24h' }
              )
              res.cookie('jwt', createdToken, {
                httpOnly: true,
                maxAge: tokenExpiresIn,
                secure: true,
                path: '/',
              })
              res.status(200).json({
                lastName: result[0].lastName,
                firstName: result[0].firstName,
                picture: result[0].picture,
                userId: result[0].id,
                role: result[0].role,
                tokenExpiration: jwt.verify(
                  createdToken,
                  process.env.ACCESS_SECRET_TOKEN
                ).exp,
              })
            })
            .catch((error) => res.status(500).json({ error }))
        }
      }
    }
  )
}

// to get all users

exports.getAllUsers = async (req, res) => {
  if (req.auth.role === 'admin') {
    dbConnection.query('SELECT * FROM users', (err, result) => {
      if (err) return res.status(500).json(err)
      if (result === 0) return res.status(404).json([])
      const users = result.map((user) => {
        return {
          ...user,
        }
      })
      res.status(200).json(users)
    })
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

// to get all email
exports.getAllEmails = async (req, res) => {
  dbConnection.query('SELECT email FROM users', (err, result) => {
    if (err) return res.status(500).json(err)
    if (result === 0) return res.status(404).json([])
    const users = result.map((user) => {
      return {
        email: user.email,
      }
    })
    res.status(200).json(users)
  })
}

// to get one user
exports.getUserData = async (req, res, next) => {
  dbConnection.query(
    'SELECT * FROM users WHERE id = ?',
    req.params.id,
    (err, result) => {
      if (err) return res.status(500).json(err)
      if (result == 0)
        return res.status(404).json({ error: 'User not found !' })
      const dataUser = {
        ...result[0],
        // userId: result[0].id,
        // lastName: result[0].lastName,
        // firstName: result[0].firstName,
        // email: result[0].email,
        // role: result[0].role,
        // picture: result[0].picture,
      }
      res.status(200).json(dataUser)
    }
  )
}

//to logout
exports.logout = (req, res, next) => {
  res.cookie('jwt', ' ', { maxAge: 1 })
  res.redirect('/')
  console.log('You are deconnected')
}

// to edit an user
exports.editUser = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    const userData = {
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      zipCode: req.body.zipCode,
      city: req.body.city,
    }
    dbConnection.query(
      'UPDATE users SET ? WHERE id = ?',
      [userData, req.params.id],
      (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json({ message: 'Updated profile !' })
      }
    )
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

// to add shipping address
exports.addShippingAddress = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    const addressData = { ...req.body }
    dbConnection.query(
      'INSERT INTO shipping_address SET ?',
      addressData,
      (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json({ message: 'address added !' })
      }
    )
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.getShippingAddress = (req, res, next) => {
  if (req.params.id == req.auth.userId) {
    dbConnection.query(
      'SELECT * FROM shipping_address WHERE userId = ?',
      req.params.id,
      (err, result) => {
        if (err) return res.status(500).json(err)
        if (result === 0)
          return res.status(404).json({ error: 'Address not found !' })
        const data = result.map((address) => {
          return {
            ...address,
          }
        })
        res.status(200).json(data)
      }
    )
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.editShippingAddress = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    const addressData = { ...req.body }
    dbConnection.query(
      'UPDATE shipping_address SET ? WHERE id = ?',
      [addressData, req.parama.id],
      (err, result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json({ message: 'address updated !' })
      }
    )
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.deleteShippingAddress = (req, res, next) => {
  console.log(req.body)
  if (req.auth.role === 'admin' || req.auth.userId) {
    dbConnection.query(
      'SELECT * FROM shipping_address WHERE id = ?',
      req.params.id,
      (err, result) => {
        if (err) return res.status(500).json(err)
        else {
          dbConnection.query(
            'DELETE FROM shipping_address WHERE id = ?',
            req.params.id,
            (err, result) => {
              if (err) return res.status(500).json(err)
              res.status(200).json({ message: 'Product deleted !' })
            }
          )
        }
      }
    )
  } else {
    res.status(401).json({ message: 'Not authorized' })
  }
}

exports.getAllAddress = async (req, res) => {
  dbConnection.query('SELECT * FROM shipping_address', (err, result) => {
    if (err) return res.status(500).json(err)
    if (result === 0) return res.status(404).json([])
    const data = result.map((address) => {
      return {
        ...address,
      }
    })
    res.status(200).json(data)
  })
}
