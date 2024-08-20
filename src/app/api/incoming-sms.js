import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_API_KEY_SECRET;
const phoneNumberSid = process.env.TWILIO_PHONE_NUMBER_SID;
const client = twilio(accountSid, authToken);

export default function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method === 'POST') {
    const { From, Body } = req.body;

    // Forward the SMS to your personal number
    client.messages
      .create({
        body: `SMS from ${From}: ${Body}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+14135224500', // Your personal phone number
      })
      .then(message => {
        res.status(200).send(`Message forwarded: ${message.sid}`);
      })
      .catch(error => {
        console.error('Error forwarding message:', error);
        res.status(500).send(`Error: ${error.message}`);
      });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
