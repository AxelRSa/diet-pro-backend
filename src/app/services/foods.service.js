const connection = require('../../config/db');

/**
 * @typedef {import('../helpers/FoodsObjects').FoodFromDataBase} FoodFromDataBase
 */

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
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const createFoodMeasure = async (idFood, name, quantity) => {
  try {
    const sql =
      `
      INSERT INTO foods_measures (id_food, measure_name, quantity)
      VALUES (?, ?, ?)
      `
    return await query(sql, [idFood, name, quantity])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
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
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

/** Get foods by idUser with pagination
 * @param {Number} idUser id user
 * @param {Number} limitStart from where begin to take the query
 * @param {Number} items how many items we need
 * @returns {Promise< FoodFromDataBase[] | Error >}
 */
const getFoodsByIdUserWithLimits = async (idUser, limitStart, items) => {
  try {
    const sql =
      `
      SELECT
        f.id_food,
        f.name,
        f.carbohydrates,
        f.protein,
        f.fat,
        fm.name as measure_name,
        fm.grams,
        fm.id_food_measure
      FROM foods as f
      LEFT JOIN foods_measures as fm ON f.id_food = fm.id_food
      WHERE id_user = ?
      ORDER BY f.name ASC
      LIMIT ?, ?
      `
    return await query(sql, [idUser, limitStart, items])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

/** Get foods count by IdUser
 * @param {Number} idUser id user
 * @returns {Promise< [{count: number}] | Error >}
 */
const getFoodsCountByIdUser = async (idUser) => {
  try {
    const sql =
      `
      SELECT COUNT(*) as count FROM foods
      WHERE id_user = ?
      `
    return await query(sql, [idUser])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

/** Get foods by idUser and search with pagination
 * @param {Number} idUser id user
 * @param {Number} limitStart from where begin to take the query
 * @param {Number} items how many items we need
 * @param {String} search query to search
 * @returns {Promise< FoodFromDataBase[] | Error >}
 */
const getFoodsByIdUserAndSearchWithLimits = async (idUser, limitStart, items, search) => {
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
    return await query(sql, [idUser, `%${search}%`, limitStart, items])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

/** Get foods count by IdUser
 * @param {Number} idUser id user
 * @param {String} search query to search
 * @returns {Promise< [{count: number}] | Error >}
 */
const getFoodsCountByIdUserAndSearch = async (idUser, search) => {
  try {
    const sql =
      `
      SELECT COUNT(*) as count FROM foods
      WHERE id_user = ?
      AND name LIKE ?
      `
    return await query(sql, [idUser, `%${search}%`])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
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
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const getFoodMeasuresByIdFoodAndName = async (idFood, name) => {
  try {
    const sql =
      `
      SELECT * FROM foods_measures
      WHERE id_food = ?
      AND measure_name = ?
      `
    return await query(sql, [idFood, name])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}
// update
const updateFoodByIdFood = async (idFood, name, carbohydrates, protein, fat) => {
  try {
    const sql =
      `
      UPDATE foods
      SET name = ?, carbohydrates = ?, protein = ?, fat = ?
      WHERE id_food = ?
      `
    return await query(sql, [name, carbohydrates, protein, fat, idFood])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const updateFoodMeasureByIdMeasure = async (idMeasure, name, quantity) => {
  try {
    const sql =
      `
      UPDATE foods_measures
      SET measure_name = ?, quantity = ?
      WHERE id_food_measure = ?
      `
    return await query(sql, [name, quantity, idMeasure])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

// delete
const deleteFoodMeasureByIdMeasure = async (idMeasure) => {
  try {
    const sql =
      `
      DELETE FROM foods_measures
      WHERE id_food_measure = ?
      `
    return await query(sql, [idMeasure])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const deleteFoodByIdFood = async (idFood) => {
  try {
    const sql =
      `
      DELETE FROM foods
      WHERE id_food = ?
      `
    return await query(sql, [idFood])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}




module.exports = {
  createFood,
  createFoodMeasure,
  getFoodsByIdUserAndName,
  getFoodsByIdUserWithLimits,
  getFoodsCountByIdUser,
  getFoodsByIdUserAndSearchWithLimits,
  getFoodsCountByIdUserAndSearch,
  getFoodByIdUserAndIdFood,
  getFoodMeasuresByIdFoodAndName,
  updateFoodByIdFood,
  deleteFoodMeasureByIdMeasure,
  updateFoodMeasureByIdMeasure,
  deleteFoodByIdFood
}
