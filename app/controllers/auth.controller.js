const auth = require('../service/auth.service');
const { encrypt, compare } = require("../helpers/handleBcrypt")
const { tokenSign } = require("../helpers/generateToken")

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const userData = await auth.getUserByEmail(email)
    if (userData.length === 0) throw "The email is not registered, create an account"

    const user = userData[0]

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) throw "The password is incorrect, verify it"

    const token = await tokenSign(user)

    res.json({ status: "success", message: "Your login was successful", data: { token } })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body

    const emailExist = await auth.getEmailByEmail(email)
    if (emailExist.length > 0) throw "The email exist, try with another"

    const hashedPassword = await encrypt(password)
    auth.registerNewUser(email, hashedPassword, username)

    res.json({ status: "success", message: "The user was created successfully" })

  } catch (error) {
    res.status(400).json({ status: "error", message: error })
  }
}

module.exports = {
  login,
  signup
}
