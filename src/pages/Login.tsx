import React from 'react';
import { Stack } from '@chakra-ui/react';
import SignUpComponent from '../components/auth/SignUpComponent';
import LogInComponent from '../components/auth/LoginComponent';

const Login = () => (
  <Stack as="main" direction="column" alignItems="center">
    <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
      <SignUpComponent />
      <LogInComponent />
    </Stack>
  </Stack>
);
export default Login;
