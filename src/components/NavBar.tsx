/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
 Stack,
 HStack,
 Menu,
 MenuButton,
 MenuItem,
 MenuList,
 Box,
 Heading,
 Image,
 Button,
 Avatar,
} from '@chakra-ui/react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { fetchProjectNames } from '../helpers/fetchDB';

const NavBar = () => {
  const [projectNames, setProjectNames] = useState<any[]>([]);
  useEffect(() => {
    fetchProjectNames().then((data: any) => setProjectNames(data));
  }, []);

  return (
    <Stack direction="row" pos="fixed" justifyContent="center" h="85px" borderBottom="1px" borderBottomColor="gray.100" w="100%" backgroundColor="white">
      <Box maxWidth="1400px" backgroundColor="white" w="100%" pt={6}>
        <Stack direction="row" px="24px" justifyContent="space-between">
          <Link to="/">
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
          </Link>
          <HStack>
            <Menu>
              <MenuButton size="sm" as={Button} rightIcon={<BiChevronDown />}>
                Projects
              </MenuButton>
              <MenuList>
                {
                  projectNames.length
                  && projectNames.map((project) => (
                    <Link
                      key={project.id}
                      to={`/project/${project.id}`}
                    >
                      <MenuItem>
                        {project.project_name}
                      </MenuItem>
                    </Link>
))
                }
              </MenuList>
            </Menu>
            <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
            <Button colorScheme="facebook" size="sm" variant="ghost" rightIcon={<BsBoxArrowRight />}>
              Log Out
            </Button>
          </HStack>
        </Stack>
      </Box>
    </Stack>

    );
 };

export default NavBar;
