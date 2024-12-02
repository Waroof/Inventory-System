require ("dotenv").config();
const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();
app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);
async function initializeDatabase() {
    try {
        await sql
            `CREATE TABLE IF NOT EXISTS inventory (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                quantity INTEGER NOT NULL
            )`
        ;
        console.log('Database initialized');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initializeDatabase().then(()=>{
    app.listen(3005,()=>{
        console.log("Server running on port 3005");
    })
})