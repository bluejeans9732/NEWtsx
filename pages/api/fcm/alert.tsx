import admin from '@/firebase'; // Modify it according to the path of the firebase.js file.
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse): Promise<void> {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'This method is not allowed.' });
    return;
  }

  const { registrationToken, title, body } = request.body;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: registrationToken,
  };

  try {
    const fcmResponse = await admin.messaging().send(message);
    console.log('Notification successfully sent:', fcmResponse);
    response.status(200).json({ message: 'Notification was successfully sent.' });
  } catch (error) {
    console.error('There was an error sending notification:', error);
    response.status(500).json({ error: 'An error occurred while sending the notification.' });
  }

  
}