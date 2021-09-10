import React, { FC } from 'react';
import {
 Stack, Table, Thead, Tr, Th, Td, Tbody, Tfoot, TableCaption,
} from '@chakra-ui/react';
import { Projects } from '../types';

const TableList: FC<Projects> = ({ projects }) => (
  <Stack spacing={8}>
    <Table variant="simple">
      <TableCaption>Last Update: 23/12/2021</TableCaption>
      <Thead>
        <Tr>
          <Th
            fontWeight="900"
            size="2em"
            backgroundColor="gray.100"
            _hover={
              {
                cursor: 'pointer',
                backgroundColor: 'gray.200',
                transition: 'all 250ms',
              }
            }
          >
            Patient code

          </Th>
          <Th
            fontWeight="900"
            size="2em"
            backgroundColor="gray.100"
            _hover={
              {
                cursor: 'pointer',
                backgroundColor: 'gray.200',
                transition: 'all 250ms',
              }
            }
          >
            into

          </Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td isNumeric>25.4</Td>
        </Tr>
        <Tr>
          <Td>feet</Td>
          <Td>centimetres (cm)</Td>
          <Td isNumeric>30.48</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td isNumeric>0.91444</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot>
    </Table>
  </Stack>
    );

export default TableList;
