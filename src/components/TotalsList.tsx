import React, { FC } from 'react';
import {
 Stack, Table, Thead, Tr, Td, Tbody,
} from '@chakra-ui/react';
import { Surveys } from '../types';
import TableFields from './TableFields';

const fields = ['had-a', 'had-d', 'dts-f', 'dts-g', 'had-total', 'dts-total'];

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
    </Table>
  </Stack>
  );
export default TotalsList;
