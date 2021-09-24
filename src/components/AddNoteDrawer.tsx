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
    const firstField = useRef<any>();

    console.log(notes);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
          postNewNote().then((newNote) => {
            setNotes([...notes, newNote]);
            onClose();
          }); // send toaster GREEN
        } catch (error) {
          alert(error.message); // send toaster RED
        }

        setValue('');
        async function postNewNote() {
          const response: Promise<any> = await postNote(
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
        <DrawerContent
          transform="translateX(-100%)"
        >
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
                placeholder="Type here..."
                value={value}
                onChange={({ target }) => { setValue(target.value); }}
              />
            </form>
          </DrawerBody>
          <DrawerFooter justifyContent="center">
            <Button size="sm" p={4} mb="2em" variant="outline" mr={3} onClick={onClose}>
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
