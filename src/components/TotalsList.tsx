import React, { FC } from 'react';
import {
 Stack, Table, Thead, Tr, Td, Tbody,
} from '@chakra-ui/react';
import { HadsDtsTotals } from '../types';
import TableFields from './TableFields';

const getHADBackgroundColor = (number: number) => {
  let color = 'red.400';
  if (number >= 0 && number <= 7) {
    color = 'green.400';
  } else if (number >= 8 && number <= 10) {
    color = 'yellow.400';
  }
  return color;
};
const getDTSBackgroundColor = (number: number) => {
  let color = 'red.400';
  if (number >= 0 && number <= 26) {
    color = 'green.400';
  } else if (number >= 27 && number <= 54) {
    color = 'yellow.400';
  }
  return color;
};

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
          <Tr>
            {
            fields.map((field) => {
              const currentValue = data[field];
              return (

                <Td
                  isNumeric
                  backgroundColor={
                    field.includes('had')
                    ? getHADBackgroundColor(currentValue)
                  : getDTSBackgroundColor(currentValue)
}
                  color="white"
                  fontWeight="bold"
                  fontSize="md"
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
