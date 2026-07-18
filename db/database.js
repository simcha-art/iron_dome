import mysql from "mysql2/promise";

const pool = await mysql.createPool({
    host: "mysql",
    port: 3306,
    user: "root",
    password: "root",
    database: "iron_dome",
});

export default pool
