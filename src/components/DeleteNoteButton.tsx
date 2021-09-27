import React, {
 FC, useState, useRef, MutableRefObject, Dispatch,
} from 'react';
import {
 Button,
 AlertDialog,
 AlertDialogOverlay,
 AlertDialogContent,
 AlertDialogHeader,
 AlertDialogBody,
 AlertDialogFooter,
 Icon,
 useToast,
} from '@chakra-ui/react';

import { HiMinusCircle } from 'react-icons/hi';
import { deleteNote } from '../helpers/fetchDB';

type Props = {
  noteId: number,
  notes: any[],
  setNotes: Dispatch<any>,
};
const DeleteNoteButton: FC<Props> = ({
 noteId,
 notes,
 setNotes,

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef: MutableRefObject<any> = useRef();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteNote(noteId);
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        position: 'top-right',
        duration: 4500,
        isClosable: false,
        });
    onClose();
    }
  };

  return (
    <>
      <Icon
        as="button"
        mr={3}
        transition="transform 200ms"
        color="gray.200"
        fontSize="21px"
        onClick={() => setIsOpen(true)}
        _hover={{
          cursor: 'pointer',
          transform: 'scale(1.5)',
          }}
      >
        <HiMinusCircle />
      </Icon>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action can not be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button size="sm" colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteNoteButton;
