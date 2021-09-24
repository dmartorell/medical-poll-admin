/* eslint-disable camelcase */
import React, { FC, ReactNode } from 'react';
import {
 Tag, TagLabel, Stack, List, ListItem, Divider, ListIcon,
} from '@chakra-ui/react';
import { RiStickyNoteLine } from 'react-icons/ri';
import { HiMinusCircle } from 'react-icons/hi';

type Note = {
  text: string,
  created_by: string,
  saved_at: string,
};

type Props = {
  notes: Note[],
  children:ReactNode,
};

const NotesComponent: FC<Props> = ({ children, notes }) => (
  <Stack width="100%" alignItems="flex-start">
    <Tag size="md" mb={2}>
      <RiStickyNoteLine size={19} />
      <TagLabel margin={2}>Notes</TagLabel>
    </Tag>
    <Divider />
    <List spacing={2}>
      {
      notes.length
      && notes.map(({ text }) => (
        <ListItem
          px={3}
          color="gray.700"
          fontSize="sm"
          onClick={() => console.log('')}
        >
          <ListIcon
            as={HiMinusCircle}
            transition="all 200ms"
            color="gray.300"
            fontSize="18px"
            _hover={{
            cursor: 'pointer',
            transform: 'scale(1.5)',

          }}
          />
          {text}
        </ListItem>
))
      }
      {children}
    </List>
  </Stack>
    );

export default NotesComponent;
