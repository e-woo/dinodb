import mysql from "mysql2";

// Create a pool instead of a single connection
const pool = mysql.createPool({
  connectionLimit: 10, // Set a limit for the number of connections in the pool
  host: "localhost",
  user: "root",
  password: "DDegasi[545]?",
  // KAl722kXge7yrLu
  // DDegasi[545]?

  database: "dinodb",
});

// Function to get a connection from the pool
export const getConnection = (callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, connection);
  });
};

// Export the pool for use in other files
export const db = pool;
