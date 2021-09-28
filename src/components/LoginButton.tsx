import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Stack } from '@chakra-ui/react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Stack as="main" direction="column" alignItems="center">

      <Button type="button" onClick={() => loginWithRedirect()}>Log In</Button>

    </Stack>
);
};

export default LoginButton;
