const connection = require('../../config/db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

const createUser = async (email, password, username) => {
  try {
    const sql =
      `
      INSERT INTO users (email, username, password)
      VALUES (?, ?, ?)
      `
    return await query(sql, [email, username, password])
  } catch (error) { throw error }
}

const getUserById = async (idUser) => {
  try {
    const sql =
      `
      SELECT email , username , id_user
      FROM users
      WHERE id_user = ?
      `
    return await query(sql, [idUser])
  } catch (error) { throw error }
}

const getUserByEmail = async (email) => {
  try {
    const sql =
      `
      SELECT email , password , username , id_user
      FROM users
      WHERE email = ?
      `
    return await query(sql, [email])
  } catch (error) { throw error }
}

const getEmailByEmail = async (email) => {
  try {
    const sql =
      `
      SELECT email FROM users
      WHERE email = ?
      `
    return await query(sql, [email])
  } catch (error) { throw error }
}


module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getEmailByEmail
}
