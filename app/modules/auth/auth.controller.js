const usersService = require('../../services/users.service');
const { encrypt, compare } = require("../../helpers/handleBcrypt")
const { tokenSign, verifyToken } = require("../../helpers/generateToken")

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const userData = await usersService.getUserByEmail(email)
    if (userData.length === 0) throw new Error("The email is not registered, create an account")

    const user = userData[0]

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw new Error("The password is incorrect, verify it")

    const token = await tokenSign(user)

    res.json({ status: "success", message: "Your login was successful", data: { token } })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body

    const emailExist = await usersService.getEmailByEmail(email)
    if (emailExist.length > 0) throw new Error("The email exist, try with another")

    const hashedPassword = await encrypt(password)
    await usersService.createUser(email, hashedPassword, username)

    res.json({ status: "success", message: "The user was created successfully" })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const getUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    const { id: idUser } = await verifyToken(token)

    const [{ username, email }] = await usersService.getUserById(idUser)

    res.json({ status: "success", data: { user: {email, idUser, username} } })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

module.exports = {
  login,
  signup,
  getUser
}
