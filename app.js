const express = require('express');
const cors = require("cors")
var morgan = require('morgan')
const app = express()

// env variables
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// middleware
// body parser for json info
app.use(express.json())
// cors usage https://www.npmjs.com/package/cors
app.use(cors())
// morgan https://www.npmjs.com/package/morgan
app.use(morgan('tiny'))

// use routes
app.use("/api/auth", require("./app/modules/auth/auth.route"))
app.use("/api/user", require("./app/modules/user/user.route"))
app.use("/api/person", require("./app/modules/person/person.route"))
app.use("/api/food", require("./app/modules/food/food.route"))

// server initialization
app.listen(process.env.PORT, () => {
  console.log("server is running on http://localhost:" + process.env.PORT + "/");
})
