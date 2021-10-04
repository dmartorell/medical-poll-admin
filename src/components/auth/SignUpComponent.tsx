import {
 Box, Button, FormControl, FormLabel, Input, VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import supabase from '../../SupabaseClient';

const SignUpComponent = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const handleClick = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
    console.log({ user });
    console.log(error?.message || 'ERROR');
  };

    return (

      <VStack spacing={8}>
        <FormControl id="signUp">
          <Box>
            <FormLabel fontSize={{ sm: 14, lg: 17 }}>
              Username:
            </FormLabel>
            <Input
              id="signupUsername"
              placeholder="Type your username..."
              fontSize="sm"
              type="text"
              w="60%"
              minW="300px"
              onChange={({ target }) => setUserName(target.value)}
              value={userName}
              variant="outline"
              size="md"
            />
          </Box>
          <Box>
            <FormLabel fontSize={{ sm: 14, lg: 17 }}>
              Email:
            </FormLabel>
            <Input
              id="signupEmail"
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
              id="signupPassword"
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
            colorScheme="blue"
            variant="solid"
          >
            SIGN UP
          </Button>
        </Box>
      </VStack>

    );
};

export default SignUpComponent;
