import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAqZcO4OIYZmgiV1YXx4C5l0tLoNeOUtf8",
  authDomain: "onnodhara-47cb3.firebaseapp.com",
  projectId: "onnodhara-47cb3",
  storageBucket: "onnodhara-47cb3.firebasestorage.app",
  messagingSenderId: "1054672223332",
  appId: "1:1054672223332:web:62a9d68424224817073371",
  measurementId: "G-THYRD1XHFT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export default app;