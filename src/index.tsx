import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';

const breakpoints = createBreakpoints({
  sm: '350px',
  md: '868px',
  lg: '1300px',
  xl: '1500px',
});

const theme = extendTheme({ breakpoints });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Auth0Provider
        domain="dev-kn5i5b65.eu.auth0.com"
        clientId="Ra6Yso2Doc2dJNqaKvb6kY17U7gRcoHm"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
