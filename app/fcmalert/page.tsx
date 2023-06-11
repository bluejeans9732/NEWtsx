'use client'

import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage, MessagePayload } from "firebase/messaging";

import AlertComp from './alertComp'
import { Payload } from '@/util/types'


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
    <AlertComp />
  );
};

export default FcmAlert;