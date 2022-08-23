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

const getFoodsByIdUserWithLimits = async (idUser, limitStart, limitEnd) => {
  try {
    const sql =
      `
      SELECT f.id_food as idFood, f.name, f.carbohydrates, f.protein, f.fat, fm.measure_name as measureName, fm.quantity, fm.id_food_measure as idMeasure
      FROM foods as f
      LEFT JOIN foods_measures as fm ON f.id_food = fm.id_food
      WHERE id_user = ?
      ORDER BY f.name ASC
      LIMIT ?, ?
      `
    return await query(sql, [idUser, limitStart, limitEnd])
  } catch (error) { throw error }
}

const getFoodsCountByIdUser = async (idUser) => {
  try {
    const sql =
      `
      SELECT COUNT(*) as count FROM foods
      WHERE id_user = ?
      `
    return await query(sql, [idUser])
  } catch (error) { throw error }
}

const getFoodsByIdUserAndSearchWithLimits = async (idUser, limitStart, limitEnd, search) => {
  try {
    const sql =
      `
      SELECT f.id_food as idFood, f.name, f.carbohydrates, f.protein, f.fat, fm.measure_name as measureName, fm.quantity, fm.id_food_measure as idMeasure
      FROM foods as f
      LEFT JOIN foods_measures as fm ON f.id_food = fm.id_food
      WHERE id_user = ?
      AND f.name LIKE ?
      LIMIT ?, ?
      `
    return await query(sql, [idUser, `%${search}%`, limitStart, limitEnd])
  } catch (error) { throw error }
}

const getFoodsCountByIdUserAndSearch = async (idUser, search, limitStart, limitEnd) => {
  try {
    const sql =
      `
      SELECT COUNT(*) as count FROM foods
      WHERE id_user = ?
      AND name LIKE ?
      `
    return await query(sql, [idUser, `%${search}%`, limitStart, limitEnd])
  } catch (error) { throw error }
}

const getFoodByIdUserAndIdFood = async (idUser, idFood) => {
  try {
    const sql =
      `
      SELECT f.id_food as idFood, f.name, f.carbohydrates, f.protein, f.fat, fm.measure_name as measureName, fm.quantity, fm.id_food_measure as idMeasure
      FROM foods as f
      LEFT JOIN foods_measures as fm ON f.id_food = fm.id_food
      WHERE id_user = ?
      AND f.id_food = ?
      `
    return await query(sql, [idUser, idFood])
  } catch (error) { throw error }
}
// update

// delete

module.exports = {
  createFood,
  getFoodsByIdUserAndName,
  getFoodsByIdUserWithLimits,
  getFoodsCountByIdUser,
  getFoodsByIdUserAndSearchWithLimits,
  getFoodsCountByIdUserAndSearch,
  getFoodByIdUserAndIdFood
}
