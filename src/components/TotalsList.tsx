import React, { FC } from 'react';
import {
 Stack, Table, Thead, Tr, Td, Tbody,
} from '@chakra-ui/react';
import { HadsDtsTotals } from '../types';
import TableFields from './TableFields';

const TotalsList: FC<HadsDtsTotals> = ({ data }) => {
  const fields = Object.keys(data);

  console.log(fields);
  return (
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
            {
            fields.map((field) => (
              <Td>
                {data[field]}
              </Td>
            ))
            }
          </Tr>
        </Tbody>
      </Table>
    </Stack>
  );
 };
export default TotalsList;
