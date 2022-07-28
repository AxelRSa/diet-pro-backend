const connection  = require('../../config/db');

const promisify = require("util").promisify
const query = promisify(connection.query).bind(connection)

module.exports = {}
