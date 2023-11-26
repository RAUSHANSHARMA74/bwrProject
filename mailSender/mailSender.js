const nodemailer = require("nodemailer");
require("dotenv").config()

async function sendMail(userEmail, friendName, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.clientEmail,
        pass: process.env.clientPassword,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.clientEmail,
      to: userEmail,
      subject: "Welcome to Build Wealth Realtors!🎉",
      html: `
        <html>
        <body>
          <p>Dear ${friendName},</p>
          <p>Your OTP is: <strong>${otp}</strong></p>
          <p>Warm regards,</p>
          <p>Build Wealth Realtors 🚀</p>
        </body>
        </html>
        `,
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.send("send mail");
  } catch (error) {
    console.log("wrong in /mail");
  }
}

module.exports = { sendMail };