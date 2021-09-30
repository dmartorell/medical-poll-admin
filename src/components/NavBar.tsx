/* eslint-disable camelcase */
import React, { FC, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
 useMediaQuery,
} from '@chakra-ui/react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import logo from '../assets/icons/logo.png';
import { Projects } from '../types';
import supabase from '../SupabaseClient';
import { sessionContext } from '../App';

const NavBar: FC<Projects> = ({ projects }) => {
  const history = useHistory();
  const session = useContext(sessionContext);
  const [isLargerThan1300] = useMediaQuery('(min-width: 1300px)');
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message || 'ERROR');
    }
    history.push('/home');
  };
  return (
    <Stack direction="row" zIndex="2" pos="fixed" justifyContent="center" h="85px" borderBottom="1px" borderBottomColor="gray.100" w="100%" backgroundColor="white">
      <Box maxWidth="1400px" backgroundColor="white" w="100%" pt={6}>
        <Stack direction="row" px="24px" justifyContent="space-between">
          <Link to="/home">
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
          {
            session
            && (
            <HStack>
              <Menu>
                <MenuButton
                  size={isLargerThan1300 ? 'sm' : 'xs'}
                  as={Button}
                  rightIcon={<BiChevronDown />}
                >
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
              <Avatar size={isLargerThan1300 ? 'sm' : 'xs'} src={session?.user?.user_metadata?.avatar_url} />

              <Button
                colorScheme="facebook"
                size={isLargerThan1300 ? 'sm' : 'xs'}
                variant="ghost"
                rightIcon={<BsBoxArrowRight />}
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </HStack>
)
}
        </Stack>
      </Box>
    </Stack>

    );
};

export default NavBar;
