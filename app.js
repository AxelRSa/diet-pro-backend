const express = require('express');
const app = express()

// env variables
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// middlewares
// body parser
app.use(express.json())


// routes
const user = require("./routes/users.route")

// use that routes
app.use("/user", user)


app.listen(process.env.PORT, () => {
  console.log("server is running on http://localhost:" + process.env.PORT + "/");
})
