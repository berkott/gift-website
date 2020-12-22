import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
// import firebase from "firebase";
import firebase from 'firebase/app';
// import 'firebase/<PACKAGE>';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseConfig from "./firebase"

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
