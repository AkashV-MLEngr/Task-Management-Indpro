const mysql = require("mysql2/promise"); 
const dotenv = require("dotenv");
dotenv.config();


const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "akAS#.22",
  database: process.env.DB_NAME || "task_management",
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
});


(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connected successfully");
    connection.release(); 
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
})();

module.exports = db;