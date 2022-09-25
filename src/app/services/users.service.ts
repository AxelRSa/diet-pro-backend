import pool from '../../config/db'
import { RowDataPacket, FieldPacket } from 'mysql2'

/* Create */ 

/**
 * It takes an email, username, and password, and inserts them into the database
 * @param {string} email - user email
 * @param {string} password - user password
 * @param {string} username - user username
 */
export const createUser = async (email: string, password: string, username: string): Promise<void> => {
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
 * @param {string} email - email to get equals
 * @returns {Promise<[RowDataPacket[], FieldPacket[]]>} an array of emails if the email exist
 */
export const getEmailByEmail = async (email: string): Promise<[RowDataPacket[], FieldPacket[]]> => {
  try {
    const sql =
			`
      SELECT email FROM users
      WHERE email = ?
      `
    return await pool.query(sql, [email])
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}

// update

// delete