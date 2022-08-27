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

const getMealsCountByIdUser = async (idUser) => {
  try {
    const sql =
      `
      SELECT COUNT(*) as count FROM meals
      WHERE id_user = ?
      `
    return await query(sql, [idUser])
  } catch (error) { throw error }
}

const getMealsByIdUserWithLimits = async (idUser, limitStart, items) => {
  try {
    const sql =
      `
      SELECT
      m.id_meal AS idMeal,
      m.name,
      f.id_food AS idFood,
      f.name as foodName,
      f.carbohydrates,
      f.protein,
      f.fat,
      fpm.quantity,
      fm.id_food_measure AS idMeasure,
      fm.measure_name,
      fm.quantity AS measureQuantity
      FROM (
        SELECT * FROM meals
        WHERE id_user = ?
        LIMIT ?, ?
        ) as m
      LEFT JOIN foods_per_meal fpm ON fpm.id_meal = m.id_meal
      LEFT JOIN foods f ON f.id_food = fpm.id_food
      LEFT JOIN foods_measures fm ON fm.id_food_measure = fpm.id_food_measure
      `
    return await query(sql, [idUser, limitStart, items])
  } catch (error) { throw error }
}

const getMealsCountByIdUserAndSearch = async (idUser, search)=> {
  try {
    const sql =
      `
      SELECT COUNT(*) as count FROM meals
      WHERE id_user = ?
      AND name LIKE ?
      `
    return await query(sql, [idUser, `%${search}%`])
  } catch (error) { throw error }
}

const getMealsByIdUserAndSearchWithLimits = async (idUser, limitStart, items, search) => {
  try {
    const sql =
      `
      SELECT
      m.id_meal AS idMeal,
      m.name,
      f.id_food AS idFood,
      f.name as foodName,
      f.carbohydrates,
      f.protein,
      f.fat,
      fpm.quantity,
      fm.id_food_measure AS idMeasure,
      fm.measure_name,
      fm.quantity AS measureQuantity
      FROM (
        SELECT * FROM meals
        WHERE id_user = ?
        AND name LIKE ?
        LIMIT ?, ?
        ) as m
      LEFT JOIN foods_per_meal fpm ON fpm.id_meal = m.id_meal
      LEFT JOIN foods f ON f.id_food = fpm.id_food
      LEFT JOIN foods_measures fm ON fm.id_food_measure = fpm.id_food_measure
      `
    return await query(sql, [idUser, `%${search}%`, limitStart, items])
  } catch (error) { throw error }
}

// update
// delete
const deleteMealByIdMeal = async (idMeal) => {
  try {
    const sql =
      `
      DELETE FROM meals
      WHERE id_meal = ?
      `
    return await query(sql, [idMeal])
  } catch (error) { throw error }
}

module.exports = {
  createMeal,
  createFoodPerMeal,
  getMealsByIdUserAndName,
  getMealsCountByIdUser,
  getMealsCountByIdUserAndSearch,
  getMealsByIdUserAndSearchWithLimits,
  deleteMealByIdMeal,
  getMealsByIdUserWithLimits
}
