import mysql from "mysql2/promise";

const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.MY_DB_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

export default pool;
