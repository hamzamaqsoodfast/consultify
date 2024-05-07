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
app.get('/verifyclientlogin', async (req, res) => {

    try {
        const email = req.query.email; // Access the text1 query parameter sent from the client
        const password = req.query.password;
      console.log(email);
      console.log(password);
        // Compare the hashed password in the database
        const [rows] = await pool.execute(
            'SELECT * FROM patients WHERE email = ? AND password = ?',
            [email, password] // Directly use the user-provided password
        );

        if (rows.length > 0) {
            let loginstatusofclient = "Validated";
            const response = {
                loginstatusofclient: loginstatusofclient,
                email:email
            };
            console.log(response);

            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });


        }
        else {
            let loginstatusofclient = "Incorrect";
            const response = {
                loginstatusofclient: loginstatusofclient,
            };
            console.log(response);

            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });
            //   console.log(response);


        }


    } catch (error) {
        console.error('Error:', error.message);
    }
});
app.get('/senddoctor',async (req,res)=>
{

try{
    const doctorName = req.query.doctorName; 
    const contactNumber = req.query.contactNumber;
    const qualifications = req.query.qualifications;
    const experienceYears = req.query.experienceYears; 
    const email = req.query.email;
    const profilePictureUrl = req.query.profilePictureUrl;
    const username = req.query.username;
    const service=req.query.selectedService;
    const password = req.query.password;
   const fees=req.query.fees;
    console.log(doctorName)
    console.log(contactNumber)
    console.log(qualifications)
    console.log(experienceYears)
    console.log(email)
    console.log(profilePictureUrl)
    console.log(fees)
    console.log(service)

    try {
    
        const sql = 'INSERT INTO Doctors (doctor_name, contact_number, qualifications, experience_years, email, profile_picture_url,username,password,service,fees) VALUES (?, ?, ?, ?, ?, ?,? , ?, ?, ?)';
        const values = [doctorName, contactNumber, qualifications, experienceYears, email, profilePictureUrl,username,password,service,fees];

        await pool.query(sql, values);
        let successmessage = "Doctor Added Successfully!";
        const response = {
            successmessage: successmessage,
        };
      console.log(response);
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(response));
        });
        res.send('Data received and inserted successfully');
    } catch (error) {
        console.error('Error:', error.message);

        let responseMessage;
        let statusCode;

        switch (error.code) {
            case 'ER_DUP_ENTRY':
                responseMessage = 'Duplicate entry error. The specified Doctor already exists.';
                statusCode = 400;
                break;
            case 'ER_NO_REFERENCED_ROW_2':
                responseMessage = 'Foreign key constraint violation. The specified SupplierID does not exist.';
                statusCode = 400;
                break;
            // Add more cases for other error types as needed

            default:
                responseMessage = 'Internal Server Error';
                statusCode = 500;
        }

        const response = {
            errorsinsertion: responseMessage,
        };

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(response));
        });

        //   console.log(response);
        res.status(statusCode).send(responseMessage);
    } finally {
       
    }
   
}
catch(error)
{

}




});
