const nodemailer = require("nodemailer");
 
let transporter = nodemailer.createTransport({
   host: process.env.EMAIL_HOST,
   port: 465,
   secure: true, // true for 465, false for other ports
   auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_USER_PASSWORD, // generated ethereal password
   },
});

module.exports = transporter