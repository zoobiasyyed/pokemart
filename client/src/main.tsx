import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { StripeContextWrapper } from './StripeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StripeContextWrapper>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StripeContextWrapper>
  </React.StrictMode>
);
