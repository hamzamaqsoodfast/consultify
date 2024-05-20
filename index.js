const { OpenAI } = require("openai");
// Replace 'YOUR_API_KEY' with your actual Gemini API key
const { GoogleGenerativeAI } = require("@google/generative-ai");
 process.env.GOOGLE_GENAI_KEY="AIzaSyCyKGZcs5MYwfGiNcKzFQPo2t3rb3g13q8";
 var { Builder, By, until, Key } = require('selenium-webdriver');
 var driver;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_KEY);

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
const nodemailer = require("nodemailer");
require("dotenv").config();

// App password and user email from the environment variables for better security
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'hamzachlove@gmail.com', // Sender gmail address
        pass: 'wndxkxlgxcdevzet' // App password from Gmail account
    },
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
function extractTextInCurlyBrackets(message) {
    const regex = /{([^}]+)}/g;
    const matches = message.match(regex);
    if (matches) {
      const extractedText = matches.map(match => match.slice(1, -1));
      return extractedText;
    }
    return [];
  }
//   function openwhatsapp()
// {
 

//   // Create a new instance of the WebDriver
//    driver = new Builder().forBrowser('chrome').build();
//   const baseUrl = 'https://web.whatsapp.com';
  
//   driver.get(baseUrl);
  
// }
// openwhatsapp();
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Define routes and middleware
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'marketing.html'));
  });

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

function sendemailtoadmin()
{
    
    const mailOptions = {
        from: {
            name: 'Consultify Admin System',
            address: 'hamzachlove@gmail.com'
        }, // sender address
        to: ["l217745@lhr.nu.edu.pk"], // list of receivers
        subject: "New Appointment Notification", // Subject line
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>New Appointment Notification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
            <table role="presentation" align="center" width="100%" style="max-width: 600px; margin-top: 25px;">
                <tr>
                    <td style="background-color: #004aad; padding: 10px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Appointment Booked!</h1>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #ffffff; padding: 20px; text-align: center; border: 1px solid #dddddd;">
                        <p style="margin: 0; color: #333333; font-size: 16px;">Hello, <strong>Hamza</strong>,</p>
                        <p style="margin-top: 20px; color: #555555; font-size: 16px;">Please check your admin portal as a customer has booked an appointment!</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #004aad; padding: 10px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; color: #ffffff;">Thank you for using our services!</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        ` // HTML body
    };
    
// Send the email
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log("Error sending email: ", error);
    } else {
        console.log("Email sent: " + info.response);
    }
});

}

function sendemailtodoctor(doctoremail)
{
    
    const mailOptions = {
        from: {
            name: 'Consultify Admin System',
            address: 'hamzachlove@gmail.com'
        }, // sender address
        to: [doctoremail], // list of receivers
        subject: "New Appointment Notification", // Subject line
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <title>New Appointment Notification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
            <table role="presentation" align="center" width="100%" style="max-width: 600px; margin-top: 25px;">
                <tr>
                    <td style="background-color: #004aad; padding: 10px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px; color: #ffffff;">Appointment Booked!</h1>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #ffffff; padding: 20px; text-align: center; border: 1px solid #dddddd;">
                        <p style="margin: 0; color: #333333; font-size: 16px;">Hello, <strong>Doctor</strong>,</p>
                        <p style="margin-top: 20px; color: #555555; font-size: 16px;">Please check your Doctor portal as a patient has booked an appointment!</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #004aad; padding: 10px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; color: #ffffff;">Thank you for using our services!</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        ` // HTML body
    };
    
// Send the email
transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log("Error sending email: ", error);
    } else {
        console.log("Email sent: " + info.response);
    }
});

}
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
//for creating the users
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

app.get('/sendclientlogin',async (req,res)=>
    {
    
    try{
        const username = req.query.username; // Access the text1 query parameter sent from the client
        const password = req.query.password;
        const phone = req.query.phone;
        const email = req.query.email;
    
        try {
        
            const sql = 'INSERT INTO patients (username, password, email, phone) VALUES (?, ?, ?, ?)';
            const values = [username, password, email, phone];
            await pool.query(sql, values);
            let successmessage = "Patient Added Successfully!";
            const response = {
                clientlogindone: successmessage,
                patientusername:username,
                patientphone:phone,
                patientemail:email
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
                    responseMessage = 'already';
                    statusCode = 400;
                    break;
                case 'ER_NO_REFERENCED_ROW_2':
                    responseMessage = 'Foreign key constraint violation. The specified Patientid does not exist.';
                    statusCode = 400;
                    break;
                // Add more cases for other error types as needed
    
                default:
                    responseMessage = 'Internal Server Error';
                    statusCode = 500;
            }
    
            const response = {
                errorclientinsertion: responseMessage,
            };
            console.log(response);
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
app.get('/deletedoctor', async (req, res) => {
    const doctorid = req.query.customerid;
    // console.log(customerid);
 

    try {

        // Check if the medicineID exists before deletion
        const checkSql = 'SELECT * FROM Doctors WHERE doctor_id = ?';
        const checkResult = await pool.query(checkSql, [doctorid]);

        if (checkResult.length === 0) {
            const response = {
                errorsdeletion: 'Doctor not found. Deletion failed.',
            };

            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });

            //    console.log(response);
            res.status(404).send('Doctor not found. Deletion failed.');
            return;
        }

        // Delete the row with the specified medicineID
        const deleteSql = 'DELETE FROM Doctors WHERE doctor_id = ?';
        await pool.query(deleteSql, [doctorid]);

        let successmessage = 'Doctor Deleted Successfully!';
        const response = {
            successmessage: successmessage,
        };

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(response));
        });

        // console.log('Data deleted from customer table');
        res.send('Data received and deleted successfully');
    } catch (error) {
        console.error('Error:', error.message);

        let responseMessage;
        let statusCode;

        switch (error.code) {
            // Handle specific error codes as needed
            default:
                responseMessage = 'Internal Server Error';
                statusCode = 500;
        }

        const response = {
            errorsdeletion: responseMessage,
        };

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(response));
        });

        //console.log(response);
        res.status(statusCode).send(responseMessage);
    } finally {
    
    }
});
app.get('/updatedoctor', async (req, res) => {
    const {
        doctorid,
        doctorName,
        contactNumber,
        qualifications,
        experienceYears,
        email,
        profilePictureUrl,
        username,
        password,
        service,
        fees
    } = req.query;
console.log(username);
console.log(password);

    try {

        // Check if the specified medicineID exists before updating
        const checkSql = 'SELECT * FROM Doctors WHERE doctor_id = ?';
        const checkResult = await pool.query(checkSql, [doctorid]);

        if (checkResult.length === 0) {
            const response = {
                errorsupdate: 'Doctor not found. Update failed.',
            };

            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });

            //    console.log(response);
            res.status(404).send('Doctor not found. Update failed.');
            return;
        }



        // Update the row in the Medicine table based on medicineID
        const updateSql = 'UPDATE Doctors SET doctor_name=?, qualifications=?, experience_years=?, contact_number=?, email=?, profile_picture_url=?, username=?, password=?, service=?, fees=? WHERE doctor_id=?';

        const updateValues = [doctorName, qualifications, experienceYears, contactNumber, email, profilePictureUrl, username, password,service,fees, doctorid];
        
        await pool.query(updateSql, updateValues);
        let successmessage = 'Doctor Updated Successfully!';
        const response = {
            successmessage: successmessage,
        };

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(response));
        });

        // console.log('Data updated in Customer table');
        res.send('Data received and updated successfully');

    } catch (error) {
        console.error('Error:', error.message);

        let responseMessage;
        let statusCode;

        switch (error.code) {
            // Handle specific error codes as needed
            default:
                responseMessage = 'Internal Server Error';
                statusCode = 500;
        }

        const response = {
            errorsupdate: responseMessage,
        };

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(response));
        });

        //     console.log(response);
        res.status(statusCode).send(responseMessage);
    } finally {
     
    }
});

app1.get('/checkprofile', async (req, res) => {

    try {
        const username = req.query.username; // Access the text1 query parameter sent from the client
console.log(username);
  
        // Compare the hashed password in the database
        const [rows] = await pool.execute(
            'SELECT * FROM Doctors WHERE username = ?',
            [username] // Directly use the user-provided password
        );

        if (rows.length > 0) {
          
            const response = {
               dataprofile:rows
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
app.get('/updateslots', async (req, res) => {
    const username = req.query.username;
    const availability = JSON.parse(decodeURIComponent(req.query.availability));
    console.log(username);
    console.log(availability);


    try {
        const [doctors] = await pool.query('SELECT doctor_id FROM Doctors WHERE username = ?', [username]);
        if (doctors.length === 0) {
            throw new Error('Doctor not found');
        }
        const doctorId = doctors[0].doctor_id;

        await pool.query('START TRANSACTION');

        await pool.query('DELETE FROM DoctorAvailability WHERE doctorId = ?', [doctorId]);

        for (const day of availability) {
            console.log(day.date);
            for (const slot of day.slots) {
                const slotTime = `${slot}:00`;
                await pool.query('INSERT INTO DoctorAvailability (doctorId, dayOfWeek,dayDate, slot, isAvailable, isbooked) VALUES (?, ?, ?, ?, true, false)', [doctorId, day.day, day.date,slotTime]);
            }
        }

        await pool.query('COMMIT');

        const response = {
            successupdated: "Availability updated successfully",

        };

        wss.clients.forEach((client) => {
            client.send(JSON.stringify(response));
        });


    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Failed to update availability', error);
        res.status(500).json({ message: 'Failed to update availability' });
    }
});
app1.get('/checkexist', async (req, res) => {

    try {
        const username = req.query.username; // Access the text1 query parameter sent from the client
console.log(username);
  
        // Compare the hashed password in the database
        const [rows] = await pool.execute(
            'SELECT * FROM Doctors WHERE username = ?',
            [username] // Directly use the user-provided password
        );

        if (rows.length > 0) {
          
            const response = {
               dataprofile:rows
            };
            console.log(response);

            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });


        }
        else {
            let loginstatus = "doctornotexists";
            const response = {
                loginstatus: loginstatus,
            };
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });
             console.log(response);


        }


    } catch (error) {
        console.error('Error:', error.message);
    }
});

app1.get('/getclientdata', async (req, res) => {

    try {
        const email = req.query.email; // Access the text1 query parameter sent from the client
console.log(email);
  
        // Compare the hashed password in the database
        const [rows] = await pool.execute(
            'SELECT * FROM patients WHERE email = ?',
            [email] // Directly use the user-provided password
        );

        if (rows.length > 0) {
          
            const response = {
               patientprofile:rows
            };
            console.log(response);
             res.json(response);
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });


        }
        else {
            let loginstatus = "doctornotexists";
            const response = {
                loginstatus: loginstatus,
            };
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(response));
            });
             console.log(response);


        }


    } catch (error) {
        console.error('Error:', error.message);
    }
});

app1.get('/checkdoctoravail', async (req, res) => {
    const doctorId = req.query.doctorid; 
    const date = req.query.date;

    try {
        // Log for debugging purposes; consider removing in production for better performance
        console.log(`Received availability check for doctorId: ${doctorId} on date: ${date}`);

        // Fetch available time slots from the database
        const [rows] = await pool.execute(
            'SELECT slot FROM DoctorAvailability WHERE doctorId = ? AND dayOfWeek = DAYNAME(?) AND isAvailable = true AND isbooked = false',
            [doctorId, date]
        );

        let response;
        if (rows.length > 0) {
            // Time slots are available
            const timeSlots = rows.map(row => row.slot);
            response = { availableTimeSlots: timeSlots };
        } else {
            // No available time slots
            response = { availableTimeSlots: "no" };
        }

        // Send the response to the client
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response));
            }
        });

        res.json(response); // Send response to HTTP client too
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});
app1.get('/savebooking', async (req, res) => {
    // Extracting query parameters from the request
    const { doctorid, fees, patientemail, date, timeslotappointment, drivelink, description, paymentmethod, transactionId } = req.query;

    try {
        // Log for debugging purposes; consider removing in production for better performance
        console.log(`Received booking request: Doctor ID: ${doctorid}, Patient Email: ${patientemail}, Date: ${date}, Time Slot: ${timeslotappointment}, Drive Link: ${drivelink}`);

        // Fetch the slot ID from the DoctorAvailability table
        const [slotRows] = await pool.execute(
            'SELECT id FROM DoctorAvailability WHERE doctorId = ? AND dayOfWeek = DAYNAME(?) AND slot = ? AND isAvailable = true AND isbooked = false',
            [doctorid, date, timeslotappointment]
        );

        if (slotRows.length === 0) {
            // Slot not available, send error response
            return res.status(400).json({ error: "Slot not available" });
        }

        const slotId = slotRows[0].id;

        // Update DoctorAvailability table to mark the slot as booked and unavailable
        await pool.execute(
            'UPDATE DoctorAvailability SET isAvailable = false, isbooked = true WHERE id = ?',
            [slotId]
        );

        // Insert appointment data into the database
        const appointmentInsertQuery = `
            INSERT INTO Appointments (DoctorID, PatientEmail, SlotID, AppointmentDate, Status, DriveLink, Notes)
            VALUES (?, ?, ?, ?, 'pending', ?, ?)
        `;
        await pool.execute(appointmentInsertQuery, [doctorid, patientemail, slotId, date, drivelink, description]);

        // Fetch the AppointmentID for the newly inserted appointment
        const [appointmentRows] = await pool.execute(
            'SELECT AppointmentID FROM Appointments WHERE DoctorID = ? AND PatientEmail = ? AND SlotID = ?',
            [doctorid, patientemail, slotId]
        );

        const appointmentID = appointmentRows[0].AppointmentID;

        // Update the DoctorAvailability table with the AppointmentID
        await pool.execute(
            'UPDATE DoctorAvailability SET AppointmentID = ? WHERE id = ?',
            [appointmentID, slotId]
        );

        // Insert payment details into the Payments table
        const paymentInsertQuery = `
            INSERT INTO Payments (AppointmentID, PatientEmail, Amount, Method, TransactionID, PaymentStatus, DateOfPayment)
            VALUES (?, ?, ?, ?, ?, 'pending', NOW())
        `;
        await pool.execute(paymentInsertQuery, [appointmentID, patientemail, fees, paymentmethod, transactionId]);

        // Send success response to the client
        const response = { bookingdone: "Appointment booked successfully" };
                // Fetching doctor's email
                const [doctorEmailRows] = await pool.execute(
                    'SELECT email FROM Doctors WHERE doctor_id = ?',
                    [doctorid]
                );
        
                const doctorEmail = doctorEmailRows[0].email;
        
        sendemailtoadmin();
        sendemailtodoctor(doctorEmail);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response));
            }
        });
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});

app1.get('/manageappointments', async (req, res) => {
    // Extracting query parameters from the request
    const email = req.query.email;
    console.log(email);

    try {
        // Fetch appointments with doctor's name and slot time from the database matching the patient email
        const [appointmentRows] = await pool.execute(`
            SELECT A.AppointmentID,A.PatientEmail, A.AppointmentDate, A.Status, A.Notes, A.DriveLink, D.doctor_name, DA.slot
            FROM Appointments A
            JOIN Doctors D ON A.DoctorID = D.doctor_id
            JOIN DoctorAvailability DA ON A.SlotID = DA.id
            WHERE A.PatientEmail = ?
        `, [email]);

        if (appointmentRows.length === 0) {
            // No appointments found, send error response
            const response = { errorfindingappointment: "No Data Found!" };
            // Send the response to the client
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(response));
                }
            });
            return;
        }

        const response = { appointmentRows: appointmentRows };
    // Send the appointments data as JSON
    res.json(response);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(response));
            }
        }); 
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});
app1.get('/managedoctorappointments', async (req, res) => {
    // Extracting query parameters from the request
    const doctorName = req.query.doctorName;
   console.log('hi',doctorName);
    // Check if the doctorName is undefined or an empty string
    if (!doctorName) {
        res.status(400).json({ error: "Doctor name is required and must not be empty." });
        return;
    }

    try {
        // Fetch doctor ID using the doctor's name from the Doctors table
        const [doctorRows] = await pool.execute(`
            SELECT doctor_id FROM Doctors WHERE username = ?
        `, [doctorName]);
     console.log(doctorRows);
        // Check if a doctor was found
        if (doctorRows.length === 0) {
            res.status(404).json({ error: "Doctor not found!" });
            return;
        }

        // Assuming doctorRows contains only one doctor with the provided name
        const doctorId = doctorRows[0].doctor_id;
        console.log('doc: ',doctorId)
        // Fetch appointments with the doctor's ID
        const [appointmentRows] = await pool.execute(`
            SELECT A.AppointmentID, A.PatientEmail, A.AppointmentDate, A.Status, A.Notes, A.DriveLink, D.doctor_name, DA.slot
            FROM Appointments A
            JOIN Doctors D ON A.DoctorID = D.doctor_id
            JOIN DoctorAvailability DA ON A.SlotID = DA.id
            WHERE A.DoctorID = ?
        `, [doctorId]);

        // Handle case where no appointments are found
        if (appointmentRows.length === 0) {
            res.json({ error: "No appointments found for the selected doctor." });
            return;
        }

        // Send the appointments data as JSON
        res.json({ appointmentRows });

        // Optionally, send the appointments to WebSocket clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ appointmentRows }));
            }
        }); 
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});

app1.get('/cancelappointment', async (req, res) => {
    // Extracting query parameters from the request
    const appointmentId = req.query.appointmentID;
    console.log(appointmentId);

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        
        // Start a transaction
        await connection.beginTransaction();

        // Update the status of the appointment to 'cancelled' where the appointment ID matches and status is 'scheduled'
        const [updateResult] = await connection.execute(`
            UPDATE Appointments
            SET Status = 'cancelled'
            WHERE AppointmentID = ? AND Status = 'scheduled'
        `, [appointmentId]);

        if (updateResult.affectedRows === 0) {
            // No appointments were updated, send error response
            const response = { errorcancel: "Appointment is still pending. You cannot cancel it!" };
            // Send the response to all connected WebSocket clients
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(response));
                }
            });
            // Rollback the transaction
            await connection.rollback();
        } else {
            // Update the doctor's availability based on the cancelled appointment
            const [updateAvailability] = await connection.execute(`
                UPDATE DoctorAvailability
                SET isAvailable = true, isbooked = false
                WHERE AppointmentID = ?
            `, [appointmentId]);

            if (updateAvailability.affectedRows > 0) {
                const response = { canceldone: "Appointment has been cancelled successfully! Our team will contact you for refund soon!" };
                // Send the response to all connected WebSocket clients
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(response));
                    }
                });
            } else {
                console.error('No matching doctor availability found to update');
            }

            // Commit the transaction
            await connection.commit();
        }
    } catch (error) {
        console.error('Database or server error:', error.message);
        // Rollback transaction if an error occurs
        if (connection) {
            await connection.rollback();
        }
        res.status(500). send('Internal server error');
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
});


app1.get('/cancelappointmentdoctor', async (req, res) => {
    // Extracting query parameters from the request
    const appointmentId = req.query.appointmentID;
    console.log(appointmentId);

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        
        // Start a transaction
        await connection.beginTransaction();

        // Update the appointment status
        const [updateResult] = await connection.execute(`
            UPDATE Appointments
            SET Status = 'cancelled'
            WHERE AppointmentID = ? AND Status != 'cancelled'
        `, [appointmentId]);

        if (updateResult.affectedRows === 0) {
            const response = { errorcancel: "No such scheduled appointment exists or it is already cancelled." };
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(response));
                }
            });
            // Rollback the transaction
            await connection.rollback();
        } else {
            const [updateAvailability] = await connection.execute(`
                UPDATE DoctorAvailability
                SET isAvailable = true, isbooked = false
                WHERE AppointmentID = ?
            `, [appointmentId]);

            if (updateAvailability.affectedRows > 0) {
                const response = { canceldone: "Appointment has been cancelled successfully! Our team will inform patient promptly." };
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(response));
                    }
                });
            } else {
                console.error('No matching doctor availability found to update');
            }

            // Commit the transaction
            await connection.commit();
        }
    } catch (error) {
        console.error('Database or server error:', error.message);
        if (connection) {
            await connection.rollback();
        }
        res.status(500).send('Internal server error');
    } finally {
        if (connection) {
            connection.release();
        }
    }
});



app1.get('/checkappointmentdetails', async (req, res) => {
    // Extracting query parameters from the request
    const appointmentID = req.query.appointmentID;
    console.log(appointmentID);

    try {
        // Fetch appointments with doctor's name and slot time from the database matching the patient email
        const [appointmentRows] = await pool.execute(`
            SELECT A.feedback,A.AppointmentID,A.PatientEmail, A.AppointmentDate, A.Status, A.Notes, A.DriveLink, D.doctor_name, DA.slot
            FROM Appointments A
            JOIN Doctors D ON A.DoctorID = D.doctor_id
            JOIN DoctorAvailability DA ON A.SlotID = DA.id
            WHERE A.AppointmentID = ?
        `, [appointmentID]);

        if (appointmentRows.length === 0) {
            // No appointments found, send error response
            const response = { appointmentnotfounderror: "No Data Found!" };
            res.json(response);

            return;
        }

        const response = { appointment: appointmentRows };
        res.json(response);
    
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});



app1.get('/getcompletedappointments', async (req, res) => {
    // Extracting query parameters from the request
    const email = req.query.email;
    console.log(email);

    try {
        // Fetch appointments with doctor's name and slot time from the database matching the patient email
        const [appointmentRows] = await pool.execute(`
            SELECT A.feedback,A.AppointmentID,A.PatientEmail, A.AppointmentDate, A.Status, A.Notes, A.DriveLink, D.doctor_name, DA.slot
            FROM Appointments A
            JOIN Doctors D ON A.DoctorID = D.doctor_id
            JOIN DoctorAvailability DA ON A.SlotID = DA.id
            WHERE A.PatientEmail = ? AND A.Status= 'completed'
        `, [email]);

        if (appointmentRows.length === 0) {
            // No appointments found, send error response
            const response = { notcompleted: "No Data Found!" };
            res.json(response);
            console.log(response);

            return;
        }

        const response = { completeddata: appointmentRows };
    //    console.log(response);
        res.json(response);
    
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});


app1.get('/updatedoctorrating', async (req, res) => {
    // Extracting query parameters from the request
    const rating = parseFloat(req.query.rating); // Ensure rating is parsed as float
    const appointmentId = req.query.appointmentId;

    try {
        // Update the rating of the appointment in the Appointments table
        await pool.execute(`
            UPDATE Appointments 
            SET rating = ?
            WHERE AppointmentID = ?
        `, [rating, appointmentId]);

        // Fetch the doctor ID associated with the appointment
        const [doctorRows] = await pool.execute(`
            SELECT DoctorID FROM Appointments WHERE AppointmentID = ?
        `, [appointmentId]);

        const doctorID = doctorRows[0].DoctorID;

        // Calculate new collective rating for the doctor
        const [ratingRows] = await pool.execute(`
            SELECT AVG(rating) AS avgRating FROM Appointments WHERE DoctorID = ? AND Status = 'completed' AND rating IS NOT NULL
        `, [doctorID]);

        const newRating = ratingRows[0].avgRating;

        // Update the collective rating of the doctor in the Doctors table
        await pool.execute(`
            UPDATE Doctors 
            SET rating = ?
            WHERE doctor_id = ?
        `, [newRating, doctorID]);

        const response = { success: "Rating updated successfully." };
        res.json(response);
    
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});



app1.get('/getallappointments', async (req, res) => {
    try {
        const [appointments] = await pool.execute(`
            SELECT A.feedback, A.AppointmentID, A.PatientEmail, A.AppointmentDate, A.Status AS AppointmentStatus, A.Notes, A.DriveLink, D.doctor_name, DA.slot, P.PaymentStatus AS PaymentStatus, P.RefundStatus AS RefundStatus
            FROM Appointments A
            JOIN Doctors D ON A.DoctorID = D.doctor_id
            JOIN DoctorAvailability DA ON A.SlotID = DA.id
            LEFT JOIN Payments P ON A.AppointmentID = P.AppointmentID
            ORDER BY 
                CASE WHEN A.Status = 'pending' THEN 0 ELSE 1 END, 
                A.AppointmentID
        `);
console.log(appointments)
        res.json({ completeddata: appointments });
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error');
    }
});

app1.get('/getallpayments', async (req, res) => {
    try {
        console.log(5);
        const [payments] = await pool.execute(`
        SELECT P.PaymentID, P.AppointmentID, P.PatientEmail, P.Amount, P.Method, P.TransactionID, P.PaymentStatus, P.DateOfPayment, P.RefundStatus
        FROM Payments P
        ORDER BY P.DateOfPayment DESC, 
                 CASE WHEN P.PaymentStatus = 'pending' THEN 0 ELSE 1 END
        
        `);
        console.log(payments);

        res.json({completeddata: payments});
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error');
    }
});


app1.get('/changestatus', async (req, res) => {
    // Extracting query parameters from the request
    const appointmentId = req.query.appointmentId;
    const status = req.query.status;
    const updatedstatus = status.toLowerCase(); // Ensure status is in lower case

    let connection;
    try {
        // Get a connection from the pool
        connection = await pool.getConnection();
        // Start a transaction
        await connection.beginTransaction();

        // Update the status of the appointment in the Appointments table
        const [updateResult] = await connection.execute(`
            UPDATE Appointments
            SET Status = ?
            WHERE AppointmentID = ?
        `, [updatedstatus, appointmentId]);

        if (updatedstatus === 'cancelled' && updateResult.affectedRows > 0) {
            // Free up the doctor's timeslot if the appointment was successfully cancelled
            await connection.execute(`
                UPDATE DoctorAvailability
                SET isAvailable = true, isbooked = false
                WHERE AppointmentID = ?
            `, [appointmentId]);
        }

      else  if (updatedstatus === 'scehduled' && updateResult.affectedRows > 0) {
            // Free up the doctor's timeslot if the appointment was successfully cancelled
            await connection.execute(`
                UPDATE DoctorAvailability
                SET isAvailable = false, isbooked = true
                WHERE AppointmentID = ?
            `, [appointmentId]);
        }
        // Fetch and sort appointments after updating status
        const [appointments] = await connection.execute(`
            SELECT * FROM Appointments 
            ORDER BY 
                CASE WHEN LOWER(Status) = 'pending' THEN 0 ELSE 1 END, 
                AppointmentID
        `);

        const response = {
            successstatus: "Status updated successfully.",
            data: appointments
        };
        console.log(response);
        res.json(response);

        // Commit the transaction
        await connection.commit();
    } catch (error) {
        console.error('Database or server error:', error.message);
        // Rollback transaction if error occurs
        if (connection) {
            await connection.rollback();
        }
        res.status(500).send('Internal server error');
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
});


app1.get('/changepaymentstatus', async (req, res) => {
    // Extracting query parameters from the request
    const paymentid = req.query.paymentid;
    const status = req.query.status;
    const updatedstatus = status.toLowerCase(); // Ensure status is in lower case

    try {
        // Update the status of the payment in the Payments table
        await pool.execute(`
            UPDATE Payments 
            SET PaymentStatus = ?
            WHERE PaymentID = ?
        `, [updatedstatus, paymentid]);

        const response = {
            successstatus: "Payment status updated successfully."
        };
        console.log(response);

        (response);
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});

app1.get('/refundstatus', async (req, res) => {
    // Extracting query parameters from the request
    const paymentid = req.query.paymentid;
    const status = req.query.status;
    const updatedstatus = status.toLowerCase(); // Ensure status is in lower case

    try {
        // Update the refund status of the payment in the Payments table
        await pool.execute(`
            UPDATE Payments 
            SET RefundStatus = ?
            WHERE PaymentID = ?
        `, [updatedstatus, paymentid]);

        const response = {
            successstatus: "Refund status updated successfully."
        };
        console.log(response);

        res.json(response);
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});
app1.get('/getadminappointmentfeedback', async (req, res) => {
    // Extracting query parameters from the request


    try {
        // Fetch appointments with doctor's name and slot time from the database matching the patient email
        const [appointmentRows] = await pool.execute(`
        SELECT A.rating, A.AppointmentID, A.PatientEmail, A.AppointmentDate, A.Status, A.Notes, A.DriveLink, D.doctor_name, DA.slot
        FROM Appointments A
        JOIN Doctors D ON A.DoctorID = D.doctor_id
        JOIN DoctorAvailability DA ON A.SlotID = DA.id
        WHERE A.Status = 'completed'
    `);
    
        if (appointmentRows.length === 0) {
            // No appointments found, send error response
            const response = { notcompleted: "No Data Found!" };
            res.json(response);
            console.log(response);

            return;
        }

        const response = { completeddata: appointmentRows };
    //    console.log(response);
        res.json(response);
    
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});


app1.get('/generategemini', async (req, res) => {
    // Extracting the basic prescription from query parameters
    const basicPrescription = req.query.doctorbasicprescriptionword;
    console.log(basicPrescription)
    if (!basicPrescription) {
        return res.status(400).send('No prescription provided');
    }

    try {
        // Configure the model and prompt for generating content
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Generate a concise prescription based on the following input, focusing strictly on medication information, dosage instructions, and safety advice. Ensure that no personal patient details are included: "${basicPrescription}"`;

        // Generate refined content based on the basic prescription
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const refinedPrescription = response.text();
        console.log(refinedPrescription);
        
        // Send the refined prescription as the response
        res.json({ refinedPrescription });

    } catch (error) {
        console.error('Error with the AI generation or server:', error.message);
        res.status(500).send('Internal server error');
    }
});
app1.get('/saveprescription', async (req, res) => {
    // Extracting query parameters from the request
    const appointmentID = req.query.appointmentID;
    
    const description = req.query.description;

    try {
        // Update the refund status of the payment in the Payments table
        await pool.execute(`
            UPDATE Appointments 
            SET feedback = ?
            WHERE AppointmentID = ?
        `, [description, appointmentID]);

         let successstatusprescription="Prescription Updated Successfully!";
        res.json({ successstatusprescription });


    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});
app1.get('/getrespecteddoctorfeeback', async (req, res) => {
    // Extracting query parameters from the request
    const doctorName = req.query.doctorName;
   console.log('hi',doctorName);
    // Check if the doctorName is undefined or an empty string
    if (!doctorName) {
        res.status(400).json({ error: "Doctor name is required and must not be empty." });
        return;
    }

    try {
        // Fetch doctor ID using the doctor's name from the Doctors table
        const [doctorRows] = await pool.execute(`
            SELECT doctor_id FROM Doctors WHERE username = ?
        `, [doctorName]);
     console.log(doctorRows);
        // Check if a doctor was found
        if (doctorRows.length === 0) {
            res.status(404).json({ error: "Doctor not found!" });
            return;
        }

        // Assuming doctorRows contains only one doctor with the provided name
        const doctorId = doctorRows[0].doctor_id;
        console.log('doc: ',doctorId)
        // Fetch appointments with the doctor's ID
        const [appointmentRows] = await pool.execute(`
            SELECT A.AppointmentID, A.PatientEmail, A.AppointmentDate, A.Status, A.Notes, A.DriveLink, D.doctor_name, DA.slot
            FROM Appointments A
            JOIN Doctors D ON A.DoctorID = D.doctor_id
            JOIN DoctorAvailability DA ON A.SlotID = DA.id
            WHERE A.DoctorID = ?
        `, [doctorId]);

        // Handle case where no appointments are found
        if (appointmentRows.length === 0) {
            res.json({ error: "No appointments found for the selected doctor." });
            return;
        }
     console.log(appointmentRows);
        // Send the appointments data as JSON
        res.json({ appointmentRows });

        // Optionally, send the appointments to WebSocket clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ appointmentRows }));
            }
        }); 
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
    }
});async function senddoctordatatoclient(ws) {
    try {
      

        const [rows] = await pool.execute('SELECT * FROM Doctors');
        const response = {
            doctorsdata: rows,

        };


        ws.send(JSON.stringify(response));
    } catch (error) {
        console.error('Error fetching data from the database:', error);
    }
}

async function senddoctorcount(ws) {
    try {
 
  
      // Fetch the count of rows from the Customer table
      const [countRows] = await pool.execute('SELECT COUNT(*) AS rowCount FROM Doctors');
  
      // Extract the count value from the result
      const rowCount = countRows[0].rowCount;
  
      // Prepare the response object with the count of rows
      const response = {
        totaldoctors: rowCount,
      };

      ws.send(JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching data from the database:', error);
    }
  }
  
  wss.on('connection', (ws) => {
    senddoctorcount(ws);
  });
wss.on('connection', (ws) => {
    senddoctordatatoclient(ws);

});

async function totalappointments(ws) {
    try {
 
  
      // Fetch the count of rows from the Customer table
      const [countRows] = await pool.execute('SELECT COUNT(*) AS rowCount FROM Appointments');
  
      // Extract the count value from the result
      const rowCount = countRows[0].rowCount;
  
      // Prepare the response object with the count of rows
      const response = {
        totalappointments: rowCount,
      };

      ws.send(JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching data from the database:', error);
    }
  }
  
  wss.on('connection', (ws) => {
    totalappointments(ws);
  });
  async function totalpatients(ws) {
    try {
 
  
      // Fetch the count of rows from the Customer table
      const [countRows] = await pool.execute('SELECT COUNT(*) AS rowCount FROM Patients');
  
      // Extract the count value from the result
      const rowCount = countRows[0].rowCount;
  
      // Prepare the response object with the count of rows
      const response = {
        patientcount: rowCount,
      };

      ws.send(JSON.stringify(response));
    } catch (error) {
      console.error('Error fetching data from the database:', error);
    }
  }
  
  wss.on('connection', (ws) => {
    totalpatients(ws);
  });

  app.get('/open-whatsapp3', async (req, res) => {    // Send the array to the client
    const rowData = [];
  
    
    try {
  
      const text = req.query.text; // Access the text1 query parameter sent from the client
     let msg=JSON.parse(req.query.text1);
     console.log(msg);
  
  
      const lowerlimit = parseInt(req.query.text2);
   const upperlimit = parseInt(req.query.text3);
   const excelsheet=req.query.text4;
   const mediapath=req.query.text5;
  //console.log(totalNumbers);
  const numbersArray = text.split(',').map(number => number.trim());
  const totalNumbers = numbersArray.length;
  const dataToSend = { totalNumbers }; // Wrap the text in an object or array
  // console.log(dataToSend);
  
   // Send the data to the connected clients via WebSocket
   wss.clients.forEach((client) => {
     client.send(JSON.stringify(dataToSend));
   });
  
    //  // Send the array to the client
    //  const { Builder, By, Key, until } = require('selenium-webdriver');
    //  const chrome = require('selenium-webdriver/chrome');
     
    //    // Set up Chrome options to run in incognito mode
    //    const options = new chrome.Options().addArguments('--incognito');
  
    //    // Create a new instance of the WebDriver
    //     driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
   
        
   var baseUrl = 'https://web.whatsapp.com/send?phone=';
   let msg1=msg;
  
   if(mediapath!='' &&msg=='' && excelsheet=='')
   {
   
   for (const phoneNumber of numbersArray) {
  
     const url = baseUrl + phoneNumber;
     await driver.get(url);
     const buttonWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"app\"]/div/span[2]/div/span/div/div/div/div/div/div[2]/div/button"), 200000));
     const headerWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"main\"]/header/div[2]/div[1]/div/div/span"), 200000));
   
     try {
       let element = await Promise.race([buttonWait, headerWait]);
     // await element.click();
       let value = await element.getText();
   
       if (value === "OK") {
  await element.click();   
  const inc1=phoneNumber;
  const dataToSendq = { inc1 }; // Wrap the text in an object or array
  
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSendq));
  });     
       } else {
     
     
         const localImagePath = mediapath;
         if (!fs.existsSync(localImagePath)) {
          console.log("The local image file does not exist. Please provide a valid path");
         }
         else{
         await driver.manage().setTimeouts({ implicit: 2000 });
         const attach= driver.findElement(By.xpath("//div[@title='Attach']"));
         await attach.click();
         await sleep(1000);
         const inputField = driver.findElement(By.xpath("//input[@accept='image/*,video/mp4,video/3gpp,video/quicktime']"));
         await inputField.sendKeys(localImagePath);
       
  
       const cf1= driver.findElement(By.xpath("//span[@data-icon = 'send']"));
       await cf1.click();
       await sleep(1000);
  
         const randomNumber = Math.floor(Math.random() * (upperlimit - lowerlimit + 1)) + lowerlimit;
         const timee=(randomNumber*1000);
         await sleep(timee);
  
  
   const inc=phoneNumber;
   const dataToSendq = { inc }; // Wrap the text in an object or array
   //console.log(dataToSendq);
  
   // Send the data to the connected clients via WebSocket
   wss.clients.forEach((client) => {
     client.send(JSON.stringify(dataToSendq));
   });
         }
   
  
         
  }
      
     } catch (NoSuchElementException) {
      // console.log("Neither button nor header found");
     }
  
   }
  
  // await driver.quit();
   }
   else if(mediapath!='' && msg!='' &&excelsheet!='')
   {
  
  let num=1;
  const filename = `Excel/${excelsheet}`;
  
  const workbook = XLSX.readFile(filename);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  // Filter out empty rows
  const filteredData = jsonData.filter(row => Object.values(row).some(cell => cell !== ''));
  const extractedText = extractTextInCurlyBrackets(msg);
  
   for (const phoneNumber of numbersArray) {
    for (let i = 0; i < extractedText.length; i++) {
      const keyword = extractedText[i];
  
      for (let j = 0; j < filteredData[0].length; j++) {
        const columnHeader = filteredData[0][j];
  //console.log(columnHeader);
        if (keyword === columnHeader) {
          const columnData = filteredData[num][j];
          msg = msg.replace(new RegExp(`{${keyword}}`, 'g'), columnData);
          
        }
      }
    }
    const url = baseUrl + phoneNumber;
    await driver.get(url);
    const buttonWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"app\"]/div/span[2]/div/span/div/div/div/div/div/div[2]/div/button"), 200000));
    const headerWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"main\"]/header/div[2]/div[1]/div/div/span"), 200000));
  
    try {
      let element = await Promise.race([buttonWait, headerWait]);
    // await element.click();
      let value = await element.getText();
  
      if (value === "OK") {
  await element.click();  
  num++;     
  msg=msg1;
  
  const inc1=phoneNumber;
  const dataToSendq = { inc1 }; // Wrap the text in an object or array
  //   console.log(dataToSendq);
  
  // Send the data to the connected clients via WebSocket
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSendq));
  });     
      } else {
     
        const localImagePath = mediapath;
        if (!fs.existsSync(localImagePath)) {
          console.log("The local image file does not exist. Please provide a valid path");
         }
         else{
        await driver.manage().setTimeouts({ implicit: 2000 });
        const attach= driver.findElement(By.xpath("//div[@title='Attach']"));
        await attach.click();
        await  driver.findElement(By.xpath("//input[@accept='image/*,video/mp4,video/3gpp,video/quicktime']")).sendKeys(localImagePath);
   
       const cf1= await driver.wait(until.elementLocated(By.xpath("//span[@data-icon = 'send']")), 15000);
  
       await cf1.click();
        const inputField = await driver.wait(until.elementLocated(By.css("div[title='Type a message'] p.selectable-text.copyable-text.iq0m558w.g0rxnol2")), 15000);
  
         const lines = msg.split("\n");
       const preparedMessage = lines.join(Key.chord(Key.SHIFT, Key.ENTER));
       
       await inputField.sendKeys(preparedMessage, Key.ENTER);
        const randomNumber = Math.floor(Math.random() * (upperlimit - lowerlimit + 1)) + lowerlimit;
        const timee=(randomNumber*1000);
        await sleep(timee);  
    
      
  
        
  
     
  const inc=phoneNumber;
  const dataToSendq = { inc }; // Wrap the text in an object or array
  //console.log(dataToSendq);
  
  // Send the data to the connected clients via WebSocket
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSendq));
  });
  num++;
       
       // driver.findElement(By.xpath("//div[@class='_3Uu1_']//div[@data-testid='conversation-compose-box-input']")).sendKeys(msg);
  
  msg=msg1;
  
  
        
  }
  }
    } catch (NoSuchElementException) {
    //  console.log("Neither button nor header found");
    }
  
  }
  
  //await driver.quit();
   }
   else if(mediapath=='' && msg!='' &&excelsheet!='')
   {
  let num=1;
  
  const filename = `Excel/${excelsheet}`;
  
  const workbook = XLSX.readFile(filename);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  // Filter out empty rows
  const filteredData = jsonData.filter(row => Object.values(row).some(cell => cell !== ''));
  const extractedText = extractTextInCurlyBrackets(msg);
  
   for (const phoneNumber of numbersArray) {
    for (let i = 0; i < extractedText.length; i++) {
      const keyword = extractedText[i];
  
      for (let j = 0; j < filteredData[0].length; j++) {
        const columnHeader = filteredData[0][j];
  
        if (keyword === columnHeader) {
          const columnData = filteredData[num][j];
          
          msg = msg.replace(new RegExp(`{${keyword}}`, 'g'), columnData);
          
        }
      }
    }
  
  //console.log(msg);
    const url = baseUrl  + phoneNumber;
    await driver.get(url);
    const buttonWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"app\"]/div/span[2]/div/span/div/div/div/div/div/div[2]/div/button"), 200000));
    const headerWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"main\"]/header/div[2]/div[1]/div/div/span"), 200000));
    try {
      let element = await Promise.race([buttonWait, headerWait]);
    // await element.click();
      let value = await element.getText();
  
      if (value === "OK") {
        num=num+1;
        msg=msg1;
  
      //  console.log(num);
  await element.click();       
  const inc1=phoneNumber;
  const dataToSendq = { inc1 }; // Wrap the text in an object or array
  //   console.log(dataToSendq);
  
  // Send the data to the connected clients via WebSocket
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSendq));
  });     
      } else {
     
      
        await sleep(1000);
        const inputField = await driver.wait(until.elementLocated(By.css("div[title='Type a message'] p.selectable-text.copyable-text.iq0m558w.g0rxnol2")), 15000);
        const lines = msg.split("\n");
      const preparedMessage = lines.join(Key.chord(Key.SHIFT, Key.ENTER));
      
      await inputField.sendKeys(preparedMessage, Key.ENTER);
      
  
  
        await sleep(1000);
     
  const inc=phoneNumber;
  const dataToSendq = { inc }; // Wrap the text in an object or array
  //console.log(dataToSendq);
  num++;
       
  msg=msg1;
  // Send the data to the connected clients via WebSocket
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSendq));
  });
  
  const randomNumber = Math.floor(Math.random() * (upperlimit - lowerlimit + 1)) + lowerlimit;
  const timee=(randomNumber*1000);
  //console.log(timee);
  await sleep(timee);
   
  
        
  }
     
    } catch (NoSuchElementException) {
   //   console.log("Neither button nor header found");
    }
  
  }
  
  //await driver.quit();
   }
   else if(mediapath!='' && msg!='' &&excelsheet=='')
   {
  // Example usage
  
   for (const phoneNumber of numbersArray) {
    
    const url = baseUrl + phoneNumber;
    await driver.get(url);
    const buttonWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"app\"]/div/span[2]/div/span/div/div/div/div/div/div[2]/div/button"), 200000));
    const headerWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"main\"]/header/div[2]/div[1]/div/div/span"), 200000));
  
    try {
      let element = await Promise.race([buttonWait, headerWait]);
    // await element.click();
      let value = await element.getText();
  
      if (value === "OK") {
  await element.click();  
  const inc1=phoneNumber;
  const dataToSendq = { inc1 }; // Wrap the text in an object or array
  //   console.log(dataToSendq);
  
  // Send the data to the connected clients via WebSocket
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSendq));
  });          
      } else {
     
        const localImagePath = mediapath;
        if (!fs.existsSync(localImagePath)) {
          console.log("The local image file does not exist. Please provide a valid path");
         }
         else{
        await driver.manage().setTimeouts({ implicit: 2000 });
        const inputField = await driver.wait(until.elementLocated(By.css("div[title='Type a message'] p.selectable-text.copyable-text.iq0m558w.g0rxnol2")), 15000);
  
        const lines = msg.split("\n");
        await sleep(2000);
        const preparedMessage = lines.join(Key.chord(Key.SHIFT, Key.ENTER));
        
  await inputField.sendKeys(preparedMessage, Key.ENTER);
  await sleep(1500);
        const attach= driver.findElement(By.xpath("//div[@title='Attach']"));
        await attach.click();
        await  driver.findElement(By.xpath("//input[@accept='image/*,video/mp4,video/3gpp,video/quicktime']")).sendKeys(localImagePath);
   
       const cf1= await driver.wait(until.elementLocated(By.xpath("//span[@data-icon = 'send']")), 15000);
  
       await cf1.click();
     
        const randomNumber = Math.floor(Math.random() * (upperlimit - lowerlimit + 1)) + lowerlimit;
        const timee=(randomNumber*1000);
        await sleep(timee);  
    
      
     
  const inc=phoneNumber;
  const dataToSendq = { inc }; // Wrap the text in an object or array
  //console.log(dataToSendq);
  
  // Send the data to the connected clients via WebSocket
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(dataToSendq));
  });
  
         }
  
        
  }
     
    } catch (NoSuchElementException) {
    //  console.log("Neither button nor header found");
    }
  
  }
  
  //await driver.quit();
   }
  else if(mediapath=='' && excelsheet=='' && msg!='')
  {
    for (const phoneNumber of numbersArray) {
    
      const url = baseUrl + phoneNumber;
      await driver.get(url);
      const buttonWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"app\"]/div/span[2]/div/span/div/div/div/div/div/div[2]/div/button"), 200000));
      const headerWait = driver.wait(until.elementLocated(By.xpath("//*[@id=\"main\"]/header/div[2]/div[1]/div/div/span"), 200000));
      
      console.log(headerWait.getText());
      try {
        let element = await Promise.race([buttonWait, headerWait]);
      // await element.click();
        let value = await element.getText();
       console.log(value);
        if (value === "OK") {
          
    await element.click();   
    const inc1=phoneNumber;
    const dataToSendq = { inc1 }; // Wrap the text in an object or array
  //   console.log(dataToSendq);
  
    // Send the data to the connected clients via WebSocket
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(dataToSendq));
    });    
        } else {
       
        
       
       
          
          try{
            const inputField = await driver.wait(until.elementLocated(By.xpath("//div[@title='Type a message'][@role='textbox']")), 15000);
  
            const lines = msg.split("\n");
          
            const preparedMessage = lines.join(Key.chord(Key.SHIFT, Key.ENTER));
            
   await inputField.sendKeys(preparedMessage, Key.ENTER);
   
  
          
       
    const inc=phoneNumber;
    const dataToSendq = { inc }; // Wrap the text in an object or array
   // console.log(dataToSendq);
    
    // Send the data to the connected clients via WebSocket
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(dataToSendq));
    });
    const randomNumber = Math.floor(Math.random() * (upperlimit - lowerlimit + 1)) + lowerlimit;
    const timee=(randomNumber*1000);
   // console.log(timee);
    await sleep(timee);
   
         
  }
  catch(error)
  {
    console.log('error of input box is',error);
  }
    
          
    }
       
      } catch (NoSuchElementException) {
        //console.log("Neither button nor header found");
      }
    
    }
    
  //  await driver.quit();
  }
  
   //res.send('WhatsApp web opened successfully');
  } catch (error) {
   //console.error(error);
   //res.status(500).send('Error opening WhatsApp web');
  }
    
  });

const port1 = process.env.PORT1 || 3000;

// Define the second port
const port2 = process.env.PORT2 || 3003;


// Listen on the first port
app.listen(port1, () => {
    console.log(`App1 running on port ${port1}`);
});

// Listen on the second port
app1.listen(port2, () => {
    console.log(`App2 running on port ${port2}`);
});
