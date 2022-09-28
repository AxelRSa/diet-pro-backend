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

/* Update */

/* Delete */ 