import React, {
    FC, useState, useRef, MutableRefObject, Dispatch,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from '@chakra-ui/react';

import { AiOutlineDelete } from 'react-icons/ai';
import { deleteEvaluation, deleteNoteByPatientId } from '../helpers/fetchDB';

   type Props = {
     patientId: number,
     currentDate: string,
     list: string[],
     updateList: Dispatch<any>

   };
   const DeleteEvaluationButton: FC<Props> = (
       {
    patientId,
    currentDate,
    list,
    updateList,
    },

   ) => {
     const [isOpen, setIsOpen] = useState(false);
     const onClose = () => setIsOpen(false);
     const cancelRef: MutableRefObject<any> = useRef();
     const history = useHistory();
     const toast = useToast();
     const handleDelete = async () => {
       try {
         await deleteEvaluation(patientId, currentDate);
         await deleteNoteByPatientId(patientId);
        const updatedList = list.filter((date) => date !== currentDate);
        updateList(updatedList);
        onClose();
        toast({
          title: 'Evaluation deleted',
          description: 'The evaluation has been succesfully removed',
          status: 'success',
          position: 'top-right',
          duration: 4500,
          isClosable: false,
          });
        if (!updatedList.length) {
          history.push('/home');
        }
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
         <Button
           type="submit"
           w="auto"
           color="gray.400"
           size="sm"
           fontWeight="400"
           variant="ghost"
           rightIcon={<AiOutlineDelete />}
           _hover={{
                  backgroundColor: 'blue.800',
                  color: 'white',
            }}
           onClick={() => setIsOpen(true)}
         >
           Delete Evaluation

         </Button>

         <AlertDialog
           isOpen={isOpen}
           leastDestructiveRef={cancelRef}
           onClose={onClose}
         >
           <AlertDialogOverlay>
             <AlertDialogContent>
               <AlertDialogHeader fontSize="lg" fontWeight="bold">
                 Delete Evaluation
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

   export default DeleteEvaluationButton;
