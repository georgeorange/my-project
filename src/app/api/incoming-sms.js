import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { From, Body } = req.body;

    client.messages
      .create({
        body: `SMS from ${From}: ${Body}`,
        from: twilioPhoneNumber,
        to: '+14135224500' // Your personal phone number
      })
      .then((message) => res.status(200).json({ success: true, sid: message.sid }))
      .catch((error) => res.status(500).json({ success: false, error: error.message }));
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
