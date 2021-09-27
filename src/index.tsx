import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import App from './App';

const breakpoints = createBreakpoints({
  sm: '450px',
  md: '568px',
  lg: '1300px',
  xl: '1500px',
});

const theme = extendTheme({ breakpoints });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
