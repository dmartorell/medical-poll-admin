/* eslint-disable camelcase */
import React, {
 FC, useRef, useState,
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
  Divider,
  Stack,
  useDisclosure,
  useMediaQuery,
  Box,
  FormLabel,
  Select,
  useToast,

} from '@chakra-ui/react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { Projects } from '../types';
import { createPatient } from '../helpers/fetchDB';

const EvaluationCreator: FC<Projects> = ({ projects }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan860] = useMediaQuery('(min-width: 860px)');
  const firstField = useRef<any>();
  const [selectedProject, setSelectedProject] = useState<string>(projects[0]?.project_name);

  const toast = useToast();

  const handleCancel = () => {
    setSelectedProject(projects[0].project_name);
    onClose();
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    onClose();
    try {
      const newPatient = {
        project_name: selectedProject,
      };
      await createPatient(newPatient);
      toast({
        title: 'Patient Created',
        status: 'success',
        position: 'top-right',
        duration: 4500,
        isClosable: false,
        });
      setSelectedProject(projects[0].project_name);
    } catch (error:any) {
      onClose();
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 4500,
        isClosable: false,
        });
      setSelectedProject(projects[0].project_name);
    }
    };

  return (
    <>
      <Stack alignItems="flex-start" spacing={6}>
        <Divider />
        <Button
          w="auto"
          size={isLargerThan860 ? 'sm' : 'xs'}
          fontWeight="500"
          leftIcon={<AiOutlineFileAdd />}
          onClick={onOpen}
        >
          New Patient
        </Button>
      </Stack>
      <Drawer
        isOpen={isOpen}
        initialFocusRef={firstField}
        onClose={onClose}
        size="sm"
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create New Patient</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <form
                id="newPatient"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log('submitted');
                }}
              >

                <Box>
                  <FormLabel htmlFor="project">Select Project</FormLabel>
                  <Select
                    id="project"
                    defaultValue={selectedProject}
                    ref={firstField}
                    onChange={({ target }) => setSelectedProject(target.value)}
                  >
                    {
                    projects?.map(({ project_name }) => (
                      <option
                        key={project_name}
                        value={project_name}
                      >
                        {project_name}
                      </option>
))
                  }
                  </Select>
                </Box>
              </form>
            </Stack>

          </DrawerBody>
          <DrawerFooter justifyContent="center">
            <Button size="sm" p={4} mb="2em" variant="outline" mr={3} onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              p={4}
              mb="2em"
              color="white"
              backgroundColor="blue.800"
              type="submit"
              form="newPatient"
              _hover={{ backgroundColor: 'blue.600' }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
);
};

export default EvaluationCreator;
