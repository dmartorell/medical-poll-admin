import React, {
 FC, useState, Dispatch, useRef,
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
} from '@chakra-ui/react';
import { HiPlusCircle } from 'react-icons/hi';
import { postNote } from '../helpers/fetchDB';

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
    const [isInvalidInput, setIsInvalidInput] = useState<boolean>(false);

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
            postNewNote().then((newNote) => {
              setNotes([...notes, newNote]);
              onClose();
            }); // send toaster GREEN
          } catch (error: any) {
            alert(error.message); // send toaster RED
          }

        setTimeout(() => setValue(''), 1000);
        setIsInvalidInput(false);

        async function postNewNote() {
          const response: any = await postNote(
            {
                created_by: null,
                project_name: projectName,
                patient_id: Number(patientId),
                text: value,
                survey_date: surveyDate,
            },
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
