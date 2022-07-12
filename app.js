const express = require('express');
const app = express()

// env variables
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

app.listen(process.env.PORT, () => {
	console.log("server is running on http://localhost:" + process.env.PORT + "/");
})