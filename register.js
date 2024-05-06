const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Import the cors middleware

const app = express();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'consultifyDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json()); // Parse JSON requests
app.use(cors()); 

app.post('/register', async (req, res) => {
    const { username, password, email, phone } = req.body;

    try {
        const sql = 'INSERT INTO patients (username, password, email, phone) VALUES (?, ?, ?, ?)';
        const values = [username, password, email, phone];
        await pool.query(sql, values);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: error });
    }
});
app.post('/login', async (req, res) => {
    const { username, password, email, phone } = req.body;

    try {
        const sql = 'INSERT INTO patients (username, password, email, phone) VALUES (?, ?, ?, ?)';
        const values = [username, password, email, phone];
        await pool.query(sql, values);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: error });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log('Server is listening on port:', port);
});
