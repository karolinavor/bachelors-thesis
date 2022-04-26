const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost:8889",
user: "root",
password: "",
database:"bachelor-thesis" 
})

module.exports = db;