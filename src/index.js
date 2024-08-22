import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchContextProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchContextProvider>
      <App />
      <ToastContainer />
    </SearchContextProvider>
  </React.StrictMode>
);
