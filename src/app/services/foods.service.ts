import pool from '../../config/db'
import { makeAQueryToDataBase } from '../helpers/makeAQueryToDataBase'
import { ResultSetHeader } from 'mysql2'

/* Create */
export const createFood = async (idUser: string, name: string, protein: string, carbohydrates: string, fat: string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      INSERT INTO foods (id_user, name, protein, carbohydrates, fat)
      VALUES (?, ?, ?, ?, ?)
			`
    return await pool.query(sql, [idUser, name, protein, carbohydrates, fat])
  })
  return dataFromDB
}

/* Read */

/* Update */

/* Delete */ 