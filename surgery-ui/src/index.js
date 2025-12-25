import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { theme } from './theme';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { RequestProvider } from 'react-request-hook'
import axios from 'axios'
import {ThemeProvider} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

const axiosInstance = axios.create({
    baseURL: "/api/"
})

root.render(
  <React.StrictMode>
      <RequestProvider value={axiosInstance}>
          <ThemeProvider theme={ theme }>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <App />
              </LocalizationProvider>
          </ThemeProvider>
      </RequestProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
