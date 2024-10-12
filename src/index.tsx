import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Home';
import './index.css';
import Quiz from './quiz';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Quiz />
  </React.StrictMode>
);


