/* eslint-disable react/require-default-props */
import React, {
 FC,
 MouseEventHandler,
} from 'react';
import {
 Th, Tr, Text, HStack,
} from '@chakra-ui/react';
import { TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

type Props = {
  fields: string[] | undefined,
  sortable: boolean,
  isExpandible?: boolean,
  isExpanded?: boolean,
  isNumeric?: boolean,
  onClick? : MouseEventHandler | undefined,
  color?: string
};

const TableFields: FC<Props> = ({
 fields, sortable, isNumeric = false, isExpanded = undefined, onClick = undefined, isExpandible = false, color = 'blue.800',
}) => (
  <Tr border="1px" borderColor="white">
    {
      fields?.map((head: string) => (
        <Th
          key={head}
          fontWeight="900"
          size="2em"
          transition="all 250ms"
          backgroundColor={isExpanded ? 'blue.600' : color}
          color="white"
          _hover={sortable || isExpandible
               ? {
                cursor: 'pointer',
                backgroundColor: 'blue.600',
              }
              : {}}
          onClick={onClick}
        >
          <HStack justifyContent={isNumeric ? 'flex-end' : ''}>
            <Text>{head.toUpperCase()}</Text>
            {sortable ? <TiArrowUnsorted size="15px" /> : null}
            {isExpandible && !isExpanded ? <TiArrowSortedDown size="15px" /> : null}
            {isExpandible && isExpanded ? <TiArrowSortedUp size="15px" /> : null }

          </HStack>
        </Th>
      ))
    }
  </Tr>
);

export default TableFields;
