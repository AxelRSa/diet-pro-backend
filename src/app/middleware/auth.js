const { verifyToken } = require('../helpers/generateToken');

const checkAuth = async (req, res, next) =>{
  try{
    const token = req.headers.authorization.split(" ").pop()
    const tokenData = await verifyToken(token)
    if (tokenData) return next()
    throw new Error("Your token is invalid")
  } catch(error){
    return res.status(409).json({ status: "error", message: error.message })
  }
}

module.exports = {
  checkAuth
}
