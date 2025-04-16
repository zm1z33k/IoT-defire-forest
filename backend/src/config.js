require('dotenv').config();

module.exports = {
  jwtSecret: 'super-secret-key',
  mongoURI: 'your-mongodb-cloud-url',
  twilioSID: process.env.TWILIO_ACCOUNT_SID,
  twilioToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhone: process.env.TWILIO_PHONE_NUMBER
};