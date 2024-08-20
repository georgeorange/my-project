// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Access Twilio credentials and phone number from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

app.post('/incoming-sms', (req, res) => {
  const { From, Body } = req.body;

  client.messages
    .create({
      body: `SMS from ${From}: ${Body}`,
      from: twilioPhoneNumber,
      to: '+14135224500' // Your personal phone number where the message will be forwarded
    })
    .then(message => res.send(`Message forwarded: ${message.sid}`))
    .catch(error => res.status(500).send(`Error: ${error.message}`));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
