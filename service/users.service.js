const connection  = require('../db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

const matchEmailAndPassword = (email, password) =>{
	console.log(email,password);
}

const registerUsername = async (idUser, username) =>{
  try{
    const sql = "UPDATE  users SET username = ? WHERE id_user = ? ;"
    const res = await query(sql, [username, idUser])
    return res
  } catch(error){
    throw error
  }
}

const registerNewUser = async (email, password) =>{
  try{
    const sql = "INSERT INTO users (email, password) VALUES (?, ?);"
    const res = await query(sql, [email, password])
    return res
  } catch(error){
    throw error
  }
}

module.exports = {
	matchEmailAndPassword,
  registerNewUser,
  registerUsername
}
