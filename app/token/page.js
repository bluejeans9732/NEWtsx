'use client'

import React, { useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getMessaging, onMessage, getToken } from 'firebase/messaging'

const Index = () => {
  const onMessageFCM = async () => {
    // Ask the browser for permission to notify.
    const permission = await Notification.requestPermission()
    if (permission !== 'granted') return

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    };

    const app = initializeApp(firebaseConfig)
    const messaging = getMessaging(app)

    getToken(messaging, { vapidKey: 'BFbP_SRT4wUriX63f-541vP1r_fJgmw35J8VQiKG_M1Q36vDaijxtbQbFQ51yL46UIxxoPnNQoYE6JRNX2dULFA' }).then((currentToken) => {
      if (currentToken) {
        console.log(currentToken)
      } else {
        console.log('No registration token available. Request permission to generate one.')
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
    })

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
    })
  }

  useEffect(() => {
    onMessageFCM()
  }, [])

  return (
    <div>
      <h1>hello world</h1>
    </div>
  )
}

export default Index
