import React from 'react';
import {
 Stack, HStack, Box, Heading, Image, Button, Avatar,
} from '@chakra-ui/react';
import { BsBoxArrowRight } from 'react-icons/bs';

const NavBar = () => (
  <Stack direction="row" pos="fixed" justifyContent="center" h="85px" borderBottom="1px" borderBottomColor="gray.100" w="100%">
    <Box maxWidth="1400px" backgroundColor="white" w="100%" pt={6}>
      <Stack direction="row" px="24px" justifyContent="space-between">
        <HStack spacing={2} alignItems="center">
          <Box boxSize="40px">
            <Image
              objectFit="cover"
              src="src/assets/icons/alzeimer.png"
              alt="logo"
            />
          </Box>
          <Heading as="h1" size="lg" color="blue.700">Admin</Heading>
        </HStack>
        <HStack>
          <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
          <Button colorScheme="facebook" size="sm" text variant="ghost" rightIcon={<BsBoxArrowRight />}>
            Log Out
          </Button>
        </HStack>
      </Stack>
    </Box>
  </Stack>

    );

export default NavBar;
