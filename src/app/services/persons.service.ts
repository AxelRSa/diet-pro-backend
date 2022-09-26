import pool from '../../config/db'

/* Create */

/**
 * It creates a new person in the database.
 * @param idUser - id user
 * @param name - name of the person
 * @returns The result of the query.
 */
export const createPerson = async (idUser:number, name:string) => {
  try {
    const sql =
      `
      INSERT INTO persons (id_user , name)
      VALUES (?, ?)
      `
    return await pool.query(sql, [idUser, name]) 
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}

/* Read */

/**
 * It returns an array of persons with the same name that the user provide
 * @param {number} idUser - id user
 * @param {string} name - name that the user provide
 * @returns An array of objects with the registers with that name property.
 */
export const getPersonByIdUserAndName = async (idUser:number, name:string) => {
  try {
    const sql =
      `
      SELECT name as namePerson
      FROM persons
      WHERE id_user = ?
      AND name = ?
      `
    const response = await pool.query(sql, [idUser, name])
    return response[0] as {namePerson: string}[]
  } catch (error) { console.log(error); throw new Error('Database error, contact support') }
}