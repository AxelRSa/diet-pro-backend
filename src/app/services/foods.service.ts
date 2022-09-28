import pool from '../../config/db'
import { makeAQueryToDataBase } from '../helpers/makeAQueryToDataBase'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

/* Create */

/**
 * Create a food register in our database
 * @param idUser - user id 
 * @param nameFood - food name
 * @param proteinFood - protein of the food
 * @param carbohydratesFood - carbohydrates of the food
 * @param fatFood - fat of the food
 * @returns The result of the query.
 */
export const createFood = async (idUser: string, nameFood: string, proteinFood: string, carbohydratesFood: string, fatFood: string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      INSERT INTO foods (id_user, name, protein, carbohydrates, fat)
      VALUES (?, ?, ?, ?, ?)
			`
    return await pool.query(sql, [idUser, nameFood, proteinFood, carbohydratesFood, fatFood])
  })
  return dataFromDB
}

/**
 * Create a food measure
 * @param idFood - food id
 * @param nameMeasure - measure name
 * @param gramsMeasure - measure grams
 * @returns The result of the query.
 */
export const createFoodMeasure = async (idFood: string, nameMeasure: string, gramsMeasure: string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      INSERT INTO foods_measures (id_food, name, grams)
      VALUES (?, ?, ?)
			`
    return await pool.query(sql, [idFood, nameMeasure, gramsMeasure])
  })
  return dataFromDB
}

/* Read */

/**
 * Return an array of the registers with the same name
 * @param idUser - user id
 * @param nameFood - food name
 * @returns An array of objects with the property nameFood.
 */
export const getFoodsByIdUserAndName = async (idUser:string, nameFood:string) => {
  const dataFromDB = await makeAQueryToDataBase<RowDataPacket[]>(async () => {
    const sql =
      `
      SELECT name as nameFood
      FROM foods
      WHERE id_user = ?
      AND name = ?
			`
    return await pool.query(sql, [idUser, nameFood])
  })
  return dataFromDB[0] as {nameFood:string}[]
}

/**
 * It takes idFood and nameMeasure as arguments, makes a query to the database, and returns an array of objects
 * with a single property, measureName 
 * @param idFood - food id
 * @param nameMeasure - measure name
 * @returns An array of objects with the property measureName.
 */
export const getFoodMeasuresByIdFoodAndMeasureName = async (idFood:string, nameMeasure:string) => {
  const dataFromDB = await makeAQueryToDataBase<RowDataPacket[]>(async () => {
    const sql =
      `
      SELECT name as measureName
      FROM foods_measures
      WHERE id_food = ?
      AND name = ?
      `
    return await pool.query(sql, [idFood, nameMeasure])
  })
  return dataFromDB[0] as {measureName:string}[]
}

/* Update */

/* Delete */ 

/**
 * It deletes a food from the database by its id.
 * @param idFood - string
 * @returns The result of the query.
 */
export const deleteFoodByIdFood = async (idFood:string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      DELETE FROM foods
      WHERE id_food = ?
      `
    return await pool.query(sql, [idFood])
  })
  return dataFromDB
}
