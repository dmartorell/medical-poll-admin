import React, { FC } from 'react';
import {
 Stack, Table, Thead, Tr, Td, Tbody,
} from '@chakra-ui/react';
import { HadsDtsTotals } from '../types';
import TableFields from './TableFields';

const getHADBackgroundColor = (number: number) => {
  let color = 'red.500';
  if (number >= 0 && number <= 7) {
    color = 'green.500';
  } else if (number >= 8 && number <= 10) {
    color = 'yellow.400';
  }
  return color;
};
const getTotalDTSBackgroundColor = (number: number) => {
  let color = 'red.500';
  if (number >= 0 && number <= 26) {
    color = 'green.500';
  } else if (number >= 27 && number <= 54) {
    color = 'yellow.400';
  }
  return color;
};

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
            filter="saturate(120%)"
          //   _hover={
          //   {
          //     cursor: 'pointer',
          //     transition: 'all 100ms',
          //   }
          // }
          //   onClick={handleClick}
          >
            {
            fields.map((field) => {
              const currentValue = data[field];
              return (
                <Td
                  borderWidth="1px"
                  borderColor="white"
                  isNumeric
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
