const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const sendEmail = async (
  subject,
  send_to,
  sent_from,
  reply_to,
  template,
  firstName,
  link
) => {
  try {
    // Create Email Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarOptions));

    // Options for sending email
    const options = {
      from: sent_from,
      to: send_to,
      replyTo: reply_to,
      subject,
      template,
      context: {
        firstName,
        link,
      },
    };

    // Send Email
    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.error("Error sending email:", err.message);
        console.error("Error stack trace:", err.stack);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

  } catch (error) {

    console.error("Unexpected error occurred:", error.message);
    console.error("Error stack trace:", error.stack);
  }
};

module.exports = sendEmail;
