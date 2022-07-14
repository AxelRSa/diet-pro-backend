const users = require('../service/users.service');

// just the function and the return
const doLogin = (req, res) => {
	const {email, password} = req.body
	const matchEmailAndPassword = users.matchEmailAndPassword(email, password)
  res.send("Llamada hecha")
}

const registerNewUser = (req,res) =>{
	const {email, password} = req.body
  const registerNewUser = users.registerNewUser(email, password)
  res.send("Se intenta registrar un nuevo usuario")
}

const registerUsername = (req,res) =>{
	const {id, username} = req.body
  const registerUsername = users.registerUsername(id, username)
  res.send(registerUsername)
}


module.exports = {
	doLogin,
  registerNewUser,
  registerUsername
}
