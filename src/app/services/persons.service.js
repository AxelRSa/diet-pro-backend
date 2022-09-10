const connection = require('../../config/db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

// create

const createPerson = async (idUser, name) => {
  try {
    const sql =
      `
      INSERT INTO persons (id_user , name)
      VALUES (?, ?)
      `
    return await query(sql, [idUser, name])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const createPersonWeightByIdPerson = async (idPerson, weight, date) => {
  try {
    const sql =
      `
      INSERT INTO person_weights (id_person, weight, date)
      VALUES (?, ?, ?)
      `
    return await query(sql, [idPerson, weight, date])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

// read

const getPersonByIdUserAndName = async (idUser, name) => {
  try {
    const sql =
      `
      SELECT name
      FROM persons
      WHERE id_user = ?
      AND name = ?
      `
    return await query(sql, [idUser, name])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const getPersonWeightsByIdPerson = async (idUser, idPerson, firstDate, secondDate) => {
  try {
    const sql =
      `
      SELECT p.id_person, p.name, pw.date, pw.weight
      FROM persons p
      LEFT JOIN (
        SELECT *
        FROM person_weights
        WHERE id_person = ?
        AND date >= ?
        AND date <= ?
        ) pw ON p.id_person = pw.id_person
      WHERE p.id_person = ?
      AND p.id_user = ?
      ORDER BY pw.date ASC
      `
    return await query(sql, [idPerson, firstDate, secondDate, idPerson, idUser])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const getPersonsWeightsByUserId = async (idUser, firstDate, secondDate) => {
  try {
    const sql =
      `
      SELECT p.name, p.id_person , pw.date, pw.weight
      FROM persons p
      LEFT JOIN (
        SELECT date, weight, id_person
        FROM person_weights
        WHERE date >= ?
        AND date <= ?
        ) pw ON p.id_person = pw.id_person
      WHERE p.id_user = ?
      ORDER BY pw.date ASC
      `
    return await query(sql, [firstDate, secondDate, idUser])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

// update

const updatePersonWeightByIdPersonAndDate = async (idPerson, weight, date) => {
  try {
    const sql =
      `
      UPDATE person_weights
      SET weight = ?
      WHERE id_person = ?
      AND date = ?
      `
    return await query(sql, [weight, idPerson, date])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

const updatePersonNameByIdPerson = async (idPerson, name) => {
  try {
    const sql =
      `
      UPDATE persons
      SET name = ?
      WHERE id_person = ?
      `
    return await query(sql, [name, idPerson])
  } catch (error) { console.log(error); throw new Error("Database error, contact support") }
}

// remove


module.exports = {
  createPerson,
  createPersonWeightByIdPerson,
  getPersonByIdUserAndName,
  getPersonWeightsByIdPerson,
  getPersonsWeightsByUserId,
  updatePersonWeightByIdPersonAndDate,
  updatePersonNameByIdPerson,
}
