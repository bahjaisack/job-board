require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const nodemailer = require('nodemailer');
const path = require("path");
const bodyParser = require("body-parser");
require("./src/users/schedulled"); 

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
const connection = process.env.CONNECTION_STRING;

mongoose
  .connect(connection, {})
  .then(() => {
    console.log("💪Database successfully connected💪");
  })
  .catch((err) => {
    console.error(err);
    return;
  });

const applicationRoutes = require("./src/application/route");
app.use(applicationRoutes);

const jobRoutes = require("./src/job/route");
app.use(jobRoutes);

const messageRoute = require("./src/message/route");
app.use(messageRoute);

const tagsRoute = require("./src/tags/route");
app.use(tagsRoute);

const userRoute = require("./src/users/route");
app.use(userRoute);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Directory ${uploadsDir} created successfully.`);
  } catch (err) {
    console.error(`Error creating directory ${uploadsDir}:`, err);
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/application", express.static("uploads")); // Serve the uploads directory

app.post('/send-email', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'muxibo207@gmail.com', // Replace with your email
      pass: 'rzjr sncv ihjd ahhg'   // Replace with your email password
    }
  });

  const mailOptions = {
    from: email,
    to: 'muxibo207@gmail.com', // Replace with the recipient's email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
