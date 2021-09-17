/* eslint-disable camelcase */
import React, { FC, useState } from 'react';
import {
    Table, Stack, Thead, Tr, Th, Td, Tbody,
   } from '@chakra-ui/react';
import { Details } from '../types';
import TableFields from './TableFields';

const DetailsList: FC<Details> = ({ data }) => {
    const fields = ['survey details'];
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const detailedData = data
            .map((element) => ({
                question: (element.question.question),
                hadA: (element.question_category === 'had-a' ? element.answer[0] : null),
                hadD: (element.question_category === 'had-d' ? element.answer[0] : null),
                dtsF: (element.question_category === 'dts' ? element.answer[0] : null),
                dtsG: (element.question_category === 'dts' ? element.answer[1] : null),
                clt: (element.question_category === 'cualitativa' ? element.answer[0] : null),
            }));

    return (
      <Table variant="simple" size="sm">
        <Thead>
          <TableFields
            fields={fields}
            sortable={false}
            isExpanded={isExpanded}
            isExpandible
            onClick={() => setIsExpanded((prevValue) => !prevValue)}
          />
        </Thead>
        <Tbody>
          {isExpanded
          && (
          <Stack>
            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th>question</Th>
                  <Th isTruncated isNumeric>had-a</Th>
                  <Th isTruncated isNumeric>had-d</Th>
                  <Th isTruncated isNumeric>dts-f</Th>
                  <Th isTruncated isNumeric>dts-g</Th>
                  <Th isTruncated> clt</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                    detailedData.map(({
 question, hadA, hadD, dtsF, dtsG, clt,
}) => (
  <Tr
    key={question}
    _hover={
    {
      cursor: 'pointer',
      backgroundColor: 'gray.100',
      transition: 'all 250ms',
    }
  }
  >
    <Td
      color="gray.600"
      _hover={{ transition: 'all 200ms', color: 'blue.900' }}
    >
      {question}
    </Td>
    <Td
      color="gray.900"
      fontWeight="500"
      isNumeric
    >
      {hadA}
    </Td>
    <Td
      color="gray.900"
      fontWeight="500"
      isNumeric
    >
      {hadD}
    </Td>
    <Td
      color="gray.900"
      fontWeight="500"
      isNumeric
    >
      {dtsF}
    </Td>
    <Td
      color="gray.900"
      fontWeight="500"
      isNumeric
    >
      {dtsG}
    </Td>
    <Td
      color="gray900"
    >
      {clt}
    </Td>
  </Tr>
))
                }
              </Tbody>
            </Table>
          </Stack>
)}
        </Tbody>
      </Table>
    );
};

export default DetailsList;
