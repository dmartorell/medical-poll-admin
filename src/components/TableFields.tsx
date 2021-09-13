import React, { FC } from 'react';
import {
 Th, Tr, Text, HStack,
} from '@chakra-ui/react';
import { TiArrowUnsorted } from 'react-icons/ti';

type Props = {
  fields: string[],
  sortable: boolean,
  // resortedSurveys: iSurvey[],
  // setResortedSurveys: Dispatch<SetStateAction<iSurvey[]>>
};
const TableFields: FC<Props> = ({ fields, sortable }) => {
  const handleClick = () => {
  };
  return (
    <Tr>
      {
      fields?.map((head: string) => (
        <Th
          key={head}
          fontWeight="900"
          size="2em"
          backgroundColor="blue.800"
          color="white"
          _hover={sortable
              ? {
                cursor: 'pointer',
                backgroundColor: 'blue.600',
                transition: 'all 250ms',
              }
              : {}}
          onClick={handleClick}
        >
          <HStack>
            <Text>{head.toUpperCase()}</Text>
            {sortable ? <TiArrowUnsorted size="15px" /> : null}
          </HStack>
        </Th>
      ))
    }
    </Tr>
);
};

export default TableFields;
