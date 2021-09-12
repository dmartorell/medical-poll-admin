import {
 Stack, Text, Box, HStack, Spinner,
} from '@chakra-ui/react';
import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RiFolderUserLine } from 'react-icons/ri';
import DetailsList from '../components/DetailsList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';

const Patient: FC = () => {
  const { id, projectName } = (useParams<{id: string, projectName: string}>());
  const [surveys, setSurveys] = useState<any[]>([]);
  useEffect(() => {
    setSurveys([]);
    fetchDB('answer', `patientID=eq.${id}`, ['patientID', 'date', 'project(project_name, id)'])
      .then((data:any[]) => {
        setSurveys(getSurveys(data));
      });
  }, []);
  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Stack spacing={0}>
          <Text as="h3" fontSize="0.9em" color="gray.400">
            {`PROJECT ${projectName}`}
          </Text>
          <HStack alignItems="center" spacing={2}>
            <Box color="blue.700"><RiFolderUserLine size="30px" /></Box>
            <Text as="h2" fontSize="3xl" color="blue.700">
              {`Patient ${id}`}
            </Text>
          </HStack>
        </Stack>
        {surveys.length
        ? <DetailsList surveys={surveys} />
        : (
          <Stack alignItems="center" justifyContent="center" width="100wv" height="100hv">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.600"
              size="xl"
            />
          </Stack>
          )}
      </Stack>
    </Stack>
    );
 };

export default Patient;
