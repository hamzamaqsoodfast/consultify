const { OpenAI } = require("openai");

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'hamzamaqsood@lhr786',
    database: 'consultify',
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Enable CORS for all origins

const app = express();
const app1 = express();
app1.use(cors());
// Increase the limit to handle larger payloads (e.g., 1MB)
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
const path = require('path');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // Set the desired port
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'adddoctor.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'showdoc.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'logindoc.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'appointment.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docdash.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'appointment.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'scheduleappointment.html'));
});
app.get('/senddata', async (req, res) => {

    try {
        const username = req.query.username; // Access the text1 query parameter sent from the client
        const password = req.query.password;

        // Compare the hashed password in the database
        const [rows] = await pool.execute(
            'SELECT * FROM Doctors WHERE username = ? AND password = ?',
            [username, password] // Directly use the user-provided password
        );

        if (rows.length > 0) {
            let loginstatus = "Validated";
            const response = {
                loginstatus: loginstatus,
                username:username
            };
            console.log(response);

            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });


        }
        else {
            let loginstatus = "Incorrect";
            const response = {
                loginstatus: loginstatus,
            };
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });
            //   console.log(response);


        }


    } catch (error) {
        console.error('Error:', error.message);
    }
});
