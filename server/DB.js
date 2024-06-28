const mysql = require("mysql2");

//MySQL info
const connection = mysql.createConnection({
  host: "102.130.115.69",
  user: "abbank",
  password: "Reddam2021",
  database: "abbankDB",
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
