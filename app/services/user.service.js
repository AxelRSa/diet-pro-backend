const connection  = require('../../config/db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

const getUserById = async (idUser) => {
  try {
    const sql = "SELECT email , username , id_user FROM users where id_user = ?;"
    return await query(sql, [idUser])
  } catch (error) { throw error }
}

module.exports = {
  getUserById
}
