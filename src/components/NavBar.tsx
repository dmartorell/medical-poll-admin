/* eslint-disable camelcase */
import React, { FC } from 'react';
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
import logo from '../assets/icons/logo.png';
import { Projects } from '../types';

const NavBar: FC<Projects> = ({ projects }) => (
  <Stack direction="row" zIndex="2" pos="fixed" justifyContent="center" h="85px" borderBottom="1px" borderBottomColor="gray.100" w="100%" backgroundColor="white">
    <Box maxWidth="1400px" backgroundColor="white" w="100%" pt={6}>
      <Stack direction="row" px="24px" justifyContent="space-between">
        <Link to="/">
          <HStack spacing={2} alignItems="center">
            <Box boxSize="40px">
              <Image
                objectFit="cover"
                src={logo}
                alt="logo"
              />
            </Box>
            <Heading as="h1" fontWeight="thin" size="lg" color="blue.700">Admin</Heading>
          </HStack>
        </Link>
        <HStack>
          <Menu>
            <MenuButton size="sm" as={Button} rightIcon={<BiChevronDown />}>
              Projects
            </MenuButton>
            <MenuList>
              {
                  projects?.map((project) => (
                    <Link
                      key={project.id}
                      to={`/project/${project.id}/${project.project_name}`}
                    >
                      <MenuItem>
                        {project.project_name}
                      </MenuItem>
                    </Link>
))
                }
            </MenuList>
          </Menu>
          <Avatar size="sm" src="https://bit.ly/dan-abramov" />
          <Button colorScheme="facebook" size="sm" variant="ghost" rightIcon={<BsBoxArrowRight />}>
            Log Out
          </Button>
        </HStack>
      </Stack>
    </Box>
  </Stack>

    );

export default NavBar;
