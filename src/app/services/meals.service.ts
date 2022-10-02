import pool from '../../config/db'
import { makeAQueryToDataBase } from '../helpers/makeAQueryToDataBase'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

/* Create */
/**
 * Create an meal register
 * @param idUser - user id
 * @param nameMeal - meal name
 * @param measureMeal - meal measure
 * @returns The result of the query.
 */
export const createMeal = async (idUser:string, nameMeal:string, measureMeal:string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      INSERT INTO meals (id_user, name, measure)
      VALUES (?, ?, ?)
			`
    return await pool.query(sql, [idUser, nameMeal, measureMeal])
  })
  return dataFromDB[0]
}

/**
 * Create a register in foods per meal
 * @param idMeal - meal id
 * @param idFood - food id
 * @param idMeasure - food measure id
 * @param quantityFoodPerMeal - quantity of the meal
 * @returns The result of the query.
 */
export const createFoodPerMeal = async (idMeal:string, idFood:string, idMeasure:string, quantityFoodPerMeal:string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      INSERT INTO foods_per_meal (id_meal, id_food, id_food_measure, quantity)
      VALUES (?, ?, ?, ?)
			`
    return await pool.query(sql, [idMeal, idFood, idMeasure, quantityFoodPerMeal])
  })
  return dataFromDB
}

/* Read */

/**
 * Check if in the database exist meals with the name that the user provide
 * @param {string} idUser - user id
 * @param {string} nameFood - food name
 * @returns An array of objects with the nameMeal property.
 */
export const getMealsByIdUserAndName = async (idUser:string, nameFood:string) => {
  const dataFromDB = await makeAQueryToDataBase<RowDataPacket[]>(async () => {
    const sql =
      `
      SELECT name as nameMeal
      FROM meals
      WHERE id_user = ?
      AND name = ?
			`
    return await pool.query(sql, [idUser, nameFood])
  })
  return dataFromDB[0] as {nameMeal:string}[]
}

/* Update */
/* Delete */