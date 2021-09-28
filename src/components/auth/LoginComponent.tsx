import {
    Box, Button, FormControl, FormLabel, Input, VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import supabase from '../../SupabaseClient';

const LoginComponent = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const handleClick = async (email: string, password: string) => {
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) console.log(error.message || 'ERROR');
  };
  const handleGoogleClick = async () => {
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });
    if (error) console.log(error.message || 'ERROR');
  };

  return (
    <VStack spacing={8}>
      <FormControl id="logIn">
        <Box>
          <FormLabel fontSize={{ sm: 14, lg: 17 }}>
            Email:
          </FormLabel>
          <Input
            placeholder="Type email..."
            fontSize="sm"
            type="text"
            w="60%"
            minW="300px"
            onChange={({ target }) => setUserEmail(target.value)}
            value={userEmail}
            variant="outline"
            size="md"
          />
        </Box>
        <Box>
          <FormLabel fontSize={{ sm: 14, lg: 17 }}>
            Password:
          </FormLabel>
          <Input
            placeholder="Type password..."
            fontSize="sm"
            type="text"
            w="60%"
            minW="300px"
            onChange={({ target }) => setUserPassword(target.value)}
            value={userPassword}
            variant="outline"
            size="md"
          />
        </Box>
      </FormControl>
      <Box p={5}>
        <Button
          w="auto"
          onClick={() => handleClick(userEmail, userPassword)}
          size="md"
          colorScheme="twitter"
          variant="solid"
        >
          LOG IN
        </Button>
      </Box>
      <Box p={5}>
        <Button
          w="auto"
          onClick={handleGoogleClick}
          size="md"
          colorScheme="twitter"
          variant="solid"
        >
          LOG IN WITH GOOGLE
        </Button>
      </Box>
    </VStack>
  );
};

export default LoginComponent;
