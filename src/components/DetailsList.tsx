/* eslint-disable camelcase */
import React, { FC, useState } from 'react';
import {
    Table, Stack, Thead, Text, Tr, Th, Td, Tbody,
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
      <Stack pb="1em">
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
          <Stack maxW={{ sm: '0px', md: '100%', lg: '100%' }}>
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
    transition="all 250ms"
    key={question}
    _hover={
    {
      cursor: 'default',
      backgroundColor: 'gray.100',
    }
  }
  >
    <Td
      transition="all 200ms"
      color="gray.600"
      _hover={{ color: 'blue.900' }}
    >
      <Text noOfLines={[7, 7, 10]}>
        {question}
      </Text>
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
      <Text>{clt}</Text>
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
      </Stack>

    );
};

export default DetailsList;
