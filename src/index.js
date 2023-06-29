import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import theme from './theme'
// import * as serviceWorker from './serviceWorker'
import reportWebVitals from './reportWebVitals';
import App from './components/app/App'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
