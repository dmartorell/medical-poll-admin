import React, { FC, useState } from 'react';
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
    patientId: string
    projectName: string
    surveyDate: string

};
const AddNoteDrawer:FC<Props> = (
    {
        patientId,
        projectName,
        surveyDate,
    },
) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, setValue] = useState<string>('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        postNote(
            {
                created_by: null,
                project_name: projectName,
                patient_id: Number(patientId),
                text: value,
                survey_date: surveyDate,
            },
        );
        onClose();
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
