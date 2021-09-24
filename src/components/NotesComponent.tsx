/* eslint-disable camelcase */
import React, { FC, ReactNode } from 'react';
import {
 Tag, TagLabel, Stack, List, ListItem, Divider,
} from '@chakra-ui/react';
import { RiStickyNoteLine } from 'react-icons/ri';
import DeleteNoteButton from './DeleteNoteButton';

type Note = {
  text: string,
  created_by: string,
  saved_at: string,
  id: number
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
      && notes.map(({ text, id }) => (
        <ListItem
          key={id}
          px={3}
          color="gray.700"
          fontSize="sm"
          onClick={() => console.log('')}
        >
          <DeleteNoteButton />
          {text}
        </ListItem>
))
      }

      {children}
    </List>
  </Stack>
    );

export default NotesComponent;
