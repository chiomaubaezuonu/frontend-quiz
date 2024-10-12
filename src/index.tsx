import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Home';
import './index.css';
import Quiz from './quiz';
import { Routes, Route, BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< App />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


