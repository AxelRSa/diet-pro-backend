const connection = require('../../config/db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

// create
const createFood = async (idUser, name, protein, carbohydrates, fat) => {
  try {
    const sql =
      `
      INSERT INTO foods (id_user, name, protein, carbohydrates, fat)
      VALUES (?, ?, ?, ?, ?)
      `
    return await query(sql, [idUser, name, protein, carbohydrates, fat])
  } catch (error) { throw error }
}

// read
const getFoodsByIdUserAndName = async (idUser, name) => {
  try {
    const sql =
      `
      SELECT name FROM foods
      WHERE id_user = ?
      AND name = ?
      `
    return await query(sql, [idUser, name])
  } catch (error) { throw error }
}
// update

// delete

module.exports = {
  createFood,
  getFoodsByIdUserAndName
}
