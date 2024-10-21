import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Home';
import './index.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< App />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);


