import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_ZHFHHEKxKvgXgkWPD9xkZXL5j9Bz-Oc",
  authDomain: "socialhub-stackblitz.firebaseapp.com",
  projectId: "socialhub-stackblitz",
  storageBucket: "socialhub-stackblitz.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);