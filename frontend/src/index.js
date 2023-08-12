import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './contexts/cartContext';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { UserProvider } from './contexts/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </UserProvider>
  </React.StrictMode>
);
