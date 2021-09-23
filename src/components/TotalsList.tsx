import React, { FC } from 'react';
import {
 Stack, Table, Thead, Tr, Td, Tbody,
} from '@chakra-ui/react';
import { HadsDtsTotals } from '../types';
import TableFields from './TableFields';
import { getHADBackgroundColor, getTotalDTSBackgroundColor } from '../helpers/getColors';
// const handleClick = () => { console.log('clicked'); };

const TotalsList: FC<HadsDtsTotals> = ({ data }) => {
  const fields = Object.keys(data);
  return (
    <Stack>
      <Table size="sm" variant="simple">
        <Thead>
          <TableFields
            fields={fields}
            sortable={false}
            isNumeric
          />
        </Thead>
        <Tbody>
          <Tr
            filter="saturate(110%)"
          >
            {
            fields.map((field) => {
              const currentValue = data[field];
              return (
                <Td
                  borderWidth="1px"
                  borderColor="white"
                  isNumeric
                  transition="all 400ms"
                  backgroundColor={
                    // eslint-disable-next-line no-nested-ternary
                    field.includes('had')
                    && !field.includes('total')
                    ? getHADBackgroundColor(currentValue)
                  : field === 'dts-total'
                  ? getTotalDTSBackgroundColor(currentValue)
                  : 'gray.100'
}
                  color={
                    field.includes('f')
                    || field.includes('g')
                    || field === 'had-total'
                    ? 'black'
                    : 'white'

                  }
                  fontWeight="500"
                >
                  {currentValue}
                </Td>
);
})
            }
          </Tr>
        </Tbody>
      </Table>
    </Stack>
  );
 };
export default TotalsList;
