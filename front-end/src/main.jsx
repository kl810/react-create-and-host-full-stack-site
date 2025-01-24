import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDAVFq3SvpZzyg_PK8eaxBcO40Gr7TnXmc",
  authDomain: "full-stack-react-afc5d.firebaseapp.com",
  projectId: "full-stack-react-afc5d",
  storageBucket: "full-stack-react-afc5d.firebasestorage.app",
  messagingSenderId: "357160883236",
  appId: "1:357160883236:web:8a1f56cb1ae0d9ae4c74b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
