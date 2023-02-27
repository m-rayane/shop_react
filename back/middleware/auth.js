const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// to decode token in cookie
module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt
    const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
    const userId = decodedToken.userId
    const admin = decodedToken.role
    req.auth = {
      userId: userId,
      role: admin,
    }
    console.log(req.auth)
    console.log('auth ok')
    next()
  } catch (error) {
    console.log('auth error')
    res.status(403).json({ error })
  }
}
