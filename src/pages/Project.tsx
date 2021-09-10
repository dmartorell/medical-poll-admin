import React from 'react';
import { Stack } from '@chakra-ui/react';
import TableList from '../components/TableList';

const Project = () => (
  <Stack as="main" direction="column" alignItems="center">
    <Stack direction="column" maxWidth="1000px" w="100%">
      <TableList />
    </Stack>
  </Stack>
    );

export default Project;
