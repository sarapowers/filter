
import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import styles from '../public/styles.css';
import { BrowserRouter } from 'react-router-dom';



render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,
  document.getElementById('root')
);

