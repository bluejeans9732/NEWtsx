'use client'

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage, MessagePayload } from "firebase/messaging";

const FcmAlert = () => {

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const firebaseMessaging = getMessaging(app);

  

  interface Payload {
    notification: {
      title: string;
      body: string;
    }
  }

  const [registrationToken, setRegistrationToken] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [clickUrl, setClickUrl] = useState('');

  const sendNotification = async () => {
    const url = '/api/fcm/alert';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ registrationToken, title, body }),
    });

    if (response.ok) {
      console.log('Notification was successfully sent.');
      // 알림 권한 요청
      if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          } else {
            console.log('Notification permission denied.');
          }
        });
      }
    } else {
      console.error('An error occurred while sending the notification.');
    }
  };

  useEffect(() => {
    onMessage(firebaseMessaging, (payload: MessagePayload) => {
      console.log("Message received. ", payload);
      const title = payload.notification?.title;
      const options: NotificationOptions = {
        body: payload.notification?.body || "",
      };
  
      // Display the notification
      if (title) {
        new Notification(title, options);
      }
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        value={registrationToken}
        onChange={(e) => setRegistrationToken(e.target.value)}
        placeholder="Registration Token"
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default FcmAlert;