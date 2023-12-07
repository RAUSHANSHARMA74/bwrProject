// const express = require('express');
// const bodyParser = require('body-parser');
// const twilio = require('twilio');


// app.use(bodyParser.urlencoded({ extended: false }));

// // Twilio credentials
// const accountSid = 'your_account_sid';
// const authToken = 'your_auth_token';
// const twilioPhoneNumber = 'your_twilio_phone_number';

// const client = twilio(accountSid, authToken);

// // Generate a random 6-digit OTP
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// // Endpoint to send OTP via SMS
// app.post('/send-otp', (req, res) => {
//   const { phoneNumber } = req.body;
//   const otp = generateOTP();

//   client.messages
//     .create({
//       body: `Your OTP is: ${otp}`,
//       from: twilioPhoneNumber,
//       to: phoneNumber,
//     })
//     .then(() => {
//       console.log(`OTP sent successfully to ${phoneNumber}`);
//       res.status(200).send('OTP sent successfully');
//     })
//     .catch((error) => {
//       console.error(`Error sending OTP: ${error.message}`);
//       res.status(500).send('Error sending OTP');
//     });
// });


const sendOtpOnMobileNumber = (phoneNumber) =>{
    console.log("hello")
    return `otp is sended phoneNumber : ${phoneNumber}`
}

module.exports = {sendOtpOnMobileNumber}

