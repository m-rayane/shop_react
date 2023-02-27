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
  console.log(req.body)
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        ...req.body,
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
                { expiresIn: tokenExpiresIn }
              )
              res.cookie('jwt', createdToken, {
                httpOnly: true,
                tokenExpiresIn,
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
  dbConnection.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).json(err)
    if (result === 0) return res.status(404).json([])
    const users = result.map((user) => {
      return {
        userId: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
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
  res.clearCookie('jwt')
  console.log('You are deconnected')
}

// to edit an user
exports.editUser = (req, res, next) => {
  if (req.auth.role === 'admin' || req.body.userId == req.auth.userId) {
    console.log(req.body)
    console.log(req.params)
    const userData = { ...req.body }
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
    const userData = { ...req.body }
    dbConnection.query(
      'UPDATE shippingAddress SET ? WHERE userId = ?',
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
// not active yet because we must implement to delete all posts and comments user

// exports.deleteUser = (req, res, next) => {
//   User.findOne({ _id: req.params.id }).then((user) => {
//     const filename = user.picture.split('/images')[1]
//     fs.unlink(`images/${filename}`, () => {
//       User.deleteOne({ _id: req.params.id })
//         .then(() => {
//           res
//             .status(200)
//             .json({ message: "User and user's data has been delete" })
//         })
//         .catch((error) => res.status(400).json({ error }))
//     })
//     // }
//     if (!user) {
//       res.status(404).json({ message: 'No user to delete' })
//     }
//   })
// }
