import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';      //  this will now resolve to App.jsx
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
