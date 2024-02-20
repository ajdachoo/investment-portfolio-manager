import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { theme } from "./assets/styles/theme";
import '@mantine/core/styles.css';
import Root from 'views/Root';
import { AuthProvider } from 'hooks/useAuth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='light'>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
