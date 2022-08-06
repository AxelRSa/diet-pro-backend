const connection = require('../../config/db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

const createPerson = async (idUser, name) => {
  try {
    const sql = "INSERT INTO persons (id_user , name) VALUES (?, ?)"
    return await query(sql, [idUser, name])
  } catch (error) { throw error }
}

const createPersonWeightByIdPerson = async (idPerson, weight, date) => {
  try {
    const sql = "INSERT INTO person_weights (id_person, weight, date) VALUES (?, ?, ?)"
    return await query(sql, [idPerson, weight, date])
  } catch (error) { throw error }
}

const getPerson = async (idUser, name) => {
  try {
    const sql = "SELECT name FROM persons WHERE id_user = ? AND name = ?"
    return await query(sql, [idUser, name])
  } catch (error) { throw error }
}

const getPersonsWeightsByUserId = async (idUser, firstDate, secondDate) => {
  try {
    const sql = "SELECT p.name, p.id_person , pw.date, pw.weight FROM persons p LEFT JOIN (SELECT date, weight, id_person FROM person_weights WHERE date >= ? AND date <= ?) pw ON p.id_person = pw.id_person WHERE p.id_user = ? ORDER BY date ASC"
    return await query(sql, [firstDate,secondDate,idUser])
  } catch (error) { throw error }
}

const updatePersonWeightByIdPersonAndDate = async(idPerson, weight, date) =>{
  try {
    const sql = "UPDATE person_weights SET weight = ? WHERE id_person = ? AND date = ?"
    return await query(sql, [weight, idPerson, date])
  } catch (error) { throw error }
}


module.exports = {
  createPerson,
  createPersonWeightByIdPerson,
  getPerson,
  getPersonsWeightsByUserId,
  updatePersonWeightByIdPersonAndDate
}
