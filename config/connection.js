const Sequelize = require("sequelize");
require("dotenv").config();

const sequelizeConnection = new Sequelize(process.env.databaseName, process.env.sqlUsername, process.env.sqlPass, {
    host: process.env.server,
    dialect: "mysql",
    dialectOptions: {
        ssl: false, // Disable SSL
    }
});

module.exports = { sequelizeConnection };


// import mysql from "mysql2/promise";

// // Create a connection pool
// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   database: process.env.MYSQL_DATABASE,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
// });

// export async function query({ query, values = [] }) {
//   const connection = await pool.getConnection();
//   try {
//     const [results] = await connection.execute(query, values);
//     return results;
//   } catch (error) {
//     throw Error(error.message);
//   } finally {
//     connection.release();
//   }
// }
