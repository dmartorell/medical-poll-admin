import React, {
 FC, useState, Dispatch, useRef, useContext,
} from 'react';
import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    Icon,
    Textarea,
    useToast,

} from '@chakra-ui/react';
import { HiPlusCircle } from 'react-icons/hi';
import { postNote } from '../helpers/fetchDB';
import { sessionContext } from '../App';

type Props = {
    patientId: string,
    projectName: string,
    surveyDate: string,
    notes: any[],
    setNotes: Dispatch<any>

};
const AddNoteDrawer:FC<Props> = (
    {
        patientId,
        projectName,
        surveyDate,
        notes,
        setNotes,
    },
) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = useState<string>('');
    const [isInvalidInput, setIsInvalidInput] = useState(false);
    const session = useContext(sessionContext);
    const toast = useToast();

    const firstField = useRef<any>();
    const handleCancel = () => {
      setValue('');
      setIsInvalidInput(false);
      onClose();
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (value.trim() === '') {
          setIsInvalidInput(true);
          return;
        }
          try {
            onClose();
            postNewNote().then((newNote) => {
              setNotes([...notes, newNote]);
            });
            toast({
              title: 'Note created',
              description: 'The note has been succesfully added.',
              status: 'success',
              position: 'top-right',
              duration: 4500,
              isClosable: false,
              });
          } catch (error: any) {
            toast({
              title: 'Error',
              description: error,
              status: 'error',
              position: 'top-right',
              duration: 4500,
              isClosable: false,
              });
          }

        setTimeout(() => setValue(''), 1000);
        setIsInvalidInput(false);

        async function postNewNote() {
          const response: any = await postNote(
            {
                project_name: projectName,
                patient_id: Number(patientId),
                text: value,
                survey_date: surveyDate,
                user_id: session?.user?.id,
            },
            session?.access_token,
        );
        if (!response.ok) {
          const message: string = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const [newNote] = await response.json();
        return newNote;
        }
    };
  return (
    <>
      <Icon
        as="button"
        transition="all 200ms"
        color="gray.200"
        mx={3}
        fontSize="21px"
        onClick={onOpen}
        _hover={{
            cursor: 'pointer',
            transform: 'scale(1.5)',
          }}
      >
        <HiPlusCircle />
      </Icon>
      <Drawer
        isOpen={isOpen}
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add note</DrawerHeader>
          <DrawerBody>
            <form
              id="add-note"
              onSubmit={handleSubmit}
            >
              <Textarea
                name="newNote"
                ref={firstField}
                onFocus={() => {
                  setIsInvalidInput(false);
                }}
                errorBorderColor="red.500"
                placeholder="Type here..."
                _placeholder={{ color: isInvalidInput ? 'red.500' : 'inherit' }}
                isInvalid={isInvalidInput}
                value={value}
                onChange={({ target }) => { setValue(target.value); }}
              />
            </form>

          </DrawerBody>
          <DrawerFooter justifyContent="center">
            <Button size="sm" p={4} mb="2em" variant="outline" mr={3} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              p={4}
              mb="2em"
              color="white"
              backgroundColor="blue.800"
              type="submit"
              form="add-note"
              _hover={{ backgroundColor: 'blue.600' }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddNoteDrawer;
