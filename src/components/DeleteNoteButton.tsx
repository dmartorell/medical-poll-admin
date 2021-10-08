import React, {
 FC, useState, useRef, MutableRefObject, Dispatch, useContext,
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
import { sessionContext } from '../App';

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
  const session = useContext(sessionContext);

  const handleDelete = async () => {
    try {
      await deleteNote(noteId, session?.access_token);
      onClose();
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      toast({
        title: 'Note deleted',
        description: 'The note has been succesfully removed.',
        status: 'success',
        position: 'top-right',
        duration: 4500,
        isClosable: false,
        });
      setNotes(updatedNotes);
    } catch (error: any) {
      onClose();
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 4500,
        isClosable: false,
        });
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
