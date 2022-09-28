import pool from '../../config/db'
import { makeAQueryToDataBase } from '../helpers/makeAQueryToDataBase'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

/* Create */

/**
 * It creates a new person in the database.
 * @param idUser - id user
 * @param name - name of the person
 * @returns The result of the query.
 */
export const createPerson = async (idUser:string, namePerson:string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      INSERT INTO persons (id_user , name)
      VALUES (?, ?)
			`
    return await pool.query(sql, [idUser, namePerson])
  })
  return dataFromDB
}

/* Read */

/**
 * It returns an array of persons with the same name that the user provide
 * @param {number} idUser - id user
 * @param {string} name - name that the user provide
 * @returns An array of objects with the registers with that name property.
 */
export const getPersonByIdUserAndName = async (idUser:string, namePerson:string) => {
  const dataFromDB = await makeAQueryToDataBase<RowDataPacket[]>(async () => {
    const sql =
      `
      SELECT name as namePerson
      FROM persons
      WHERE id_user = ?
      AND name = ?
			`
    return await pool.query(sql, [idUser, namePerson])
  })
  return dataFromDB[0] as {namePerson:string}[]
}