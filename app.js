const express = require('express');
const cors = require("cors")
const app = express()

// env variables
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// middlewares
// body parser for json info
app.use(express.json())
// cors usage https://www.npmjs.com/package/cors
app.use(cors())

// use routes
app.use("/api/auth", require("./app/routes/auth.route"))
app.use("/api/user", require("./app/routes/users.route"))
app.use("/api/person", require("./app/routes/persons.route"))

// server initialization
app.listen(process.env.PORT, () => {
  console.log("server is running on http://localhost:" + process.env.PORT + "/");
})
