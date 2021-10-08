/* eslint-disable camelcase */
import React, {
 FC, useState, useEffect,
} from 'react';
import { Stack, Text, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DefaultList from '../components/DefaultList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';

const Project: FC = () => {
  const { name, id } = (useParams<{name: string, id: string}>());
  const [surveys, setSurveys] = useState<any[] | undefined>();

  useEffect(() => {
    fetchDB('answer', `project=eq.${id}`, ['patientID', 'project(project_name, id)', 'date'], 'order=date.desc')
      .then((data:any[]) => {
        setSurveys(getSurveys(data));
      });
      return (() => {
        setSurveys(undefined);
      });
  }, [id]);

  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Text as="h2" fontSize={{ base: 'xl', md: 'xl', lg: '3xl' }} color="blue.700">
          Project
          {' '}
          {name}
        </Text>
        {surveys?.length
        && <DefaultList surveys={surveys} />}
        {surveys && surveys?.length < 1
        && <Text>This project has no evaluations yet.</Text>}

        {surveys?.length === undefined
        && (
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

export default Project;
