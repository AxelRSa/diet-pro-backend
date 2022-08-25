const connection = require('../../config/db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

// create
const createMeal = async (idUser, name, measure) => {
  try {
    const sql =
      `
      INSERT INTO meals (id_user, name, measure)
      VALUES (?, ?, ?)
      `
    return await query(sql, [idUser, name, measure])
  } catch (error) { throw error }
}

const createFoodPerMeal  = async (idMeal, idFood, idMeasure, quantity) => {
  try {
    const sql =
      `
      INSERT INTO foods_per_meal (id_meal, id_food, id_food_measure, quantity)
      VALUES (?, ?, ?, ?)
      `
    return await query(sql, [idMeal, idFood, idMeasure, quantity])
  } catch (error) { throw error }
}

// read
const getMealsByIdUserAndName = async (idUser, name) => {
  try {
    const sql =
      `
      SELECT name
      FROM meals
      WHERE id_user = ?
      AND name = ?
      `
    return await query(sql, [idUser, name])
  } catch (error) { throw error }
}

// update
// delete

module.exports = {
  createMeal,
  createFoodPerMeal,
  getMealsByIdUserAndName
}
