import pool from '../../config/db'

/* Create */ 

/**
 * It takes an email, username, and password, and inserts them into the database
 * todo give back the username to show it in a notification
 * @param {string} email - user email
 * @param {string} password - user password
 * @param {string} username - user username
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
 * @param {string} email - email to get equals
 * @returns {Promise<[RowDataPacket[], FieldPacket[]]>} an array of emails if the email exist
 */
export const getEmailByEmail = async (email: string) => {
  try {
    const sql =
			`
      SELECT email FROM users
      WHERE email = ?
      `
    const response = await pool.query(sql, [email])
    return response[0] as {email: string}[]
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}

// update

// delete