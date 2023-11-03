require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    user: process.env.DBUser,
    host: process.env.DBHost,
    database: process.env.DBName,
    password: process.env.Password,
    port: process.env.DBPort,
    ssl: true
});

console.log(process.env.DBPort);

app.get('/datos', (req, res) => {
    pool.query('SELECT * FROM plantas', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Hubo un error al obtener los datos');
        } else {
            res.json(result.rows);
        }
    });
});

app.listen(port, () => {
    console.log(`App corriendo en http://localhost:${port}`);
});