import admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  // Ignore "app already exists" error if the app has already been initialized
  if (!/already exists/.test(error.message)) {
    console.error('Firebase admin initialization error:', error.stack);
  }
}

export default admin;