import React, { FC, useState, Dispatch } from 'react';
import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Input,
    DrawerFooter,
    useDisclosure,
    Icon,

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

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
          postNewNote().then((newNote) => {
            console.log(newNote);
            setNotes([...notes, newNote]);
            onClose();
          }); // send toaster GREEN
        } catch (error) {
          alert(error.message); // send toaster RED
        }
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
        color="gray.300"
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
              <Input
                name="newNote"
                placeholder="Type here..."
                value={value}
                onChange={({ target }) => { setValue(target.value); }}
              />
            </form>
          </DrawerBody>
          <DrawerFooter justifyContent="center">
            <Button size="md" type="submit" form="add-note">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddNoteDrawer;
