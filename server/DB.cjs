const mysql = require("mysql2");
require("dotenv").config();

//MySQL info
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

//Create connection to mysql database
function createConnection() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL server:", err);
        reject(err);
      } else {
        console.log("Connected to MySQL server!");
        resolve();
      }
    });
  });
}

//This is parameterised MySQL query
//This is used to prevent some MySQL injections
function update(query, values) {
  connection.query(query, values, function (err) {
    if (err) throw err;
  });
}

//This is parameterised MySQL query
//This is used to prevent some MySQL injections
function select(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error with receiving data:", err);
        reject(err);
      } else {
        console.log("Received the data!");
        resolve(result);
      }
    });
  });
}

//End the connection to mysql database
function endConnection() {
  connection.end((err) => {
    if (err) throw err;
    console.log("Disconnected from MySQL database!");
  });
}

module.exports = { createConnection, update, select, endConnection };
