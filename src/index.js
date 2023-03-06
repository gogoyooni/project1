import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import firebase from "firebase/compat/app";
import { BrowserRouter } from 'react-router-dom';

// import Router from '../src/components/Router'
// console.log(firebase)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);