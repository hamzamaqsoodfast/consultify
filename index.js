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
                    const slotTime = ${slot}:00;
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
        console.log(5);
        const [appointments] = await pool.execute(`
        SELECT A.feedback,A.AppointmentID,A.PatientEmail, A.AppointmentDate, A.Status, A.Notes, A.DriveLink, D.doctor_name, DA.slot
        FROM Appointments A
        JOIN Doctors D ON A.DoctorID = D.doctor_id
        JOIN DoctorAvailability DA ON A.SlotID = DA.id
            ORDER BY 
                CASE WHEN Status = 'pending' THEN 0 ELSE 1 END, 
                AppointmentID
        `);
        console.log(appointments)

        res.json({completeddata: appointments});
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

    try {
        // Update the status of the appointment in the Appointments table
        await pool.execute(`
            UPDATE Appointments 
            SET Status = ?
            WHERE AppointmentID = ?
        `, [updatedstatus, appointmentId]);

        // Assuming you want to fetch and sort appointments after updating status
        const [appointments] = await pool.execute(`
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
    } catch (error) {
        console.error('Database or server error:', error.message);
        res.status(500).send('Internal server error'); // Send HTTP status 500 for internal server errors
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

        res.json(response);
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

/*async function senddoctorcount(ws) {
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
*/
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
