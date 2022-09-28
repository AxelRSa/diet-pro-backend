import pool from '../../config/db'
import { makeAQueryToDataBase } from '../helpers/makeAQueryToDataBase'
import { ResultSetHeader, RowDataPacket } from 'mysql2'

/* Create */

/**
 * It takes an email, username, and password, and inserts them into the database
 * @param email - user email
 * @param password - user password
 * @param username - user username
 */
export const createUser = async (email: string, password: string, username: string) => {
  const dataFromDB = await makeAQueryToDataBase<ResultSetHeader>(async () => {
    const sql =
      `
      INSERT INTO users (email, username, password)
      VALUES (?, ?, ?)
			`
    return await pool.query(sql, [email, username, password])
  })
  return dataFromDB
}

/* Read */

/**
 * Get an array of emails to know if there is another equal to the current email
 * @param email - email to get equals
 * @returns an array of emails if the email exist
 */
export const getEmailByEmail = async (email: string) => {
  const dataFromDB = await makeAQueryToDataBase<RowDataPacket[]>(async () => {
    const sql =
      `
      SELECT email as emailUser 
      FROM users
      WHERE email = ?
      `
    return await pool.query(sql, [email])
  })
  return dataFromDB[0] as { emailUser: string }[]
}

/**
 * It returns an array of objects with the user properties email, password, username, and idUser.
 * @param email - string
 * @returns An array of users
 */
export const getUserByEmail = async (emailUser: string) => {
  const dataFromDB = await makeAQueryToDataBase<RowDataPacket[]>(async () => {
    const sql =
      `
        SELECT 
        email as emailUser ,
        password as passwordUser ,
        username as usernameUser ,
        id_user as idUser
        FROM users
        WHERE email = ?
			`
    return await pool.query(sql, [emailUser])
  })
  return dataFromDB[0] as { emailUser: string, passwordUser: string, usernameUser: string, idUser: number }[]
}

/**
 * It takes an idUser, makes a query to the database, and returns the data from the database.
 * @param {number} idUser - number
 * @returns {namePerson:string}[]
 */
export const getUserById = async (idUser: number) => {
  const dataFromDB = await makeAQueryToDataBase<RowDataPacket[]>(async () => {
    const sql =
      `
        SELECT 
        email as emailUser , 
        username as usernameUser , 
        id_user as idUser
        FROM users
        WHERE id_user = ?
			`
    return await pool.query(sql, [idUser])
  })
  return dataFromDB[0] as {emailUser: string, usernameUser: string, idUser:number}[]
}

/* Update */

/* Delete */ 