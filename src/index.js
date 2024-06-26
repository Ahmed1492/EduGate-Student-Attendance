
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';
import { LocationTimeProvider } from './Components/GetLocationAndTime/GetLocationAndTime';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocationTimeProvider>
        <App />
      </LocationTimeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

