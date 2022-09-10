const bcrypt = require('bcryptjs');

const encrypt = async (plainText) => {
  const hash = await bcrypt.hash(plainText, 10)
  return hash
}

const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }
