import React, { FC } from 'react';
import {
 Stack, Table, Thead, Tr, Td, Tbody, Tfoot,
} from '@chakra-ui/react';
import { Surveys } from '../types';
import TableFields from './TableFields';

const fields = ['HAD-A', 'HAD-D', 'HAD-Total'];

const TotalsList: FC<Surveys> = ({ surveys }) => (
  <Stack>
    <Table size="sm" variant="simple">
      <Thead>
        <TableFields
          fields={fields}
          sortable={false}
        />
      </Thead>
      <Tbody>
        <Tr>
          <Td />
        </Tr>
      </Tbody>
      <Tfoot>
        <TableFields
          fields={fields}
          sortable={false}
        />
      </Tfoot>
    </Table>
  </Stack>
  );
export default TotalsList;
