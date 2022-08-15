const user = require('../service/user.service');
const { verifyToken } = require("../helpers/generateToken")

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const { id: idUser } = await verifyToken(token)

    const [{ username, email }] = await user.getUserById(idUser)

    res.json({ status: "success", data: { user: {email, idUser, username} } })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

module.exports = {
  getUser
}
