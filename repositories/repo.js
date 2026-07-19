import pool from "../db/database.js";

function baseRepo(tableName) {
    async function create(data) {
        const keys = Object.keys(data).join(", ");
        const plasceHolders = Object.values(data)
            .map((val) => "?")
            .join(", ");
        const values = Object.values(data);
        const query = `INSERT INTO ${tableName} (${keys}) VALUES (${plasceHolders})`;
        const [result] = await pool.execute(query, values);
        return result.insertId;
    }

    async function update(id, data) {
        const closure = Object.keys(data).map((key) => `${key}=?`).join(", ");
        const values = Object.values(data);
        const query = `UPDATE ${tableName} SET ${closure} WHERE id=?`;
        const [result] = await pool.execute(query, [...values, id])
        return result.affectedRows
    }

    async function get(filter) {
        const queryFilter = filter ? "WHERE " + Object.keys(filter).map(key => `${key}=?`).join(" AND "): "";
        const values = filter ? Object.values(filter): undefined
        const query = `SELECT * FROM ${tableName} ${queryFilter}`
        const [result] = await pool.execute(query, values)
        return result
    }

    return { create, update, get };
}

const operatorsRepo = baseRepo("operators")
const incidentsRepo = baseRepo("incidents")
const logsRepo = baseRepo("logs")

export {operatorsRepo, incidentsRepo, logsRepo};