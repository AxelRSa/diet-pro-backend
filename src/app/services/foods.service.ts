import pool from '../../config/db'
import { makeAQueryToDataBase } from '../helpers/makeAQueryToDataBase'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

/* Create */
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