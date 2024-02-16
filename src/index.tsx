import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import { MantineProvider } from '@mantine/core';
import { theme } from "./assets/styles/theme";
import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='light'>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
