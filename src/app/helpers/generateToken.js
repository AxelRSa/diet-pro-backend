const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
  return jwt.sign(
    {
      id: user.id_user,
      username: user.username
    },
    process.env.JWT_SECRET, { expiresIn: "7 days" }
  )
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {
  tokenSign,
  verifyToken
}
