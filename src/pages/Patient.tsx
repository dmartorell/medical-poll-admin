import { Stack, Text } from '@chakra-ui/react';
import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DefaultList from '../components/DefaultList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';

const Patient: FC = () => {
  const { id } = (useParams<{id: string}>());
  const [surveys, setSurveys] = useState<any[]>([]);
  useEffect(() => {
    fetchDB('answer', `patientID=eq.${id}`, ['patientID', 'date', 'project(project_name, id)'])
      .then((data:any[]) => {
        setSurveys(getSurveys(data));
      });
  }, []);
  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Text as="h2" fontSize="4xl" color="blue.700">
          Patient
        </Text>
        {surveys.length && <DefaultList surveys={surveys} />}
      </Stack>
    </Stack>
    );
 };

export default Patient;
