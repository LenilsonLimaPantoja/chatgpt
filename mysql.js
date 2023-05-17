const mysql = require("mysql2");

var pool = mysql.createPool({
  connectionLimit: 1000,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
});

exports.execute = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
exports.pool = pool;
