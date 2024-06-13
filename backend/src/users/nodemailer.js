// config/nodemailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Error setting up nodemailer transporter:", error);
  } else {
    console.log("Nodemailer transporter set up successfully");
  }
});

module.exports = transporter;
