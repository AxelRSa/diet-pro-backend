import pool from '../../config/db'

/* Create */ 

/**
 * It takes an email, username, and password, and inserts them into the database
 * @param email - user email
 * @param password - user password
 * @param username - user username
 */
export const createUser = async (email: string, password: string, username: string) => {
  try {
    const sql =
			`
      INSERT INTO users (email, username, password)
      VALUES (?, ?, ?)
      `
    await pool.query(sql, [email, username, password])
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}

/* Read */ 

/**
 * Get an array of emails to know if there is another equal to the current email
 * @param email - email to get equals
 * @returns an array of emails if the email exist
 */
export const getEmailByEmail = async (email: string) => {
  try {
    const sql =
			`
      SELECT email as emailUser FROM users
      WHERE email = ?
      `
    const response = await pool.query(sql, [email])
    return response[0] as {emailUser: string}[]
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}

/**
 * It returns an array of objects with the user properties email, password, username, and idUser.
 * @param email - string
 * @returns An array of users
 */
export const getUserByEmail = async (email:string) => {
  try {
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
    const response = await pool.query(sql, [email])
    return response[0] as {emailUser: string, passwordUser: string, usernameUser: string, idUser:number}[]
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}

export const getUserById = async (idUser: number) => {
  try {
    const sql =
      `
      SELECT 
      email as emailUser , 
      username as usernameUser , 
      id_user as idUser
      FROM users
      WHERE id_user = ?
      `
    const response = await pool.query(sql, [idUser])
    return response[0] as {emailUser: string, usernameUser: string, idUser:number}[]
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}

/* Update */ 

/* Delete */ 