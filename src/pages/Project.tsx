/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import DefaultList from '../components/DefaultList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';

const Project: FC = () => {
  const { name, id } = (useParams<{name: string, id: string}>());
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    fetchDB('answer', `project=eq.${id}`, ['project(project_name, id)', 'patientID', 'date'])
      .then((data:any[]) => {
        setSurveys(getSurveys(data));
      });
  }, [id]);

  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Text as="h2" fontSize="4xl" color="blue.700">
          Project
          {' '}
          {name}
        </Text>
        {surveys.length && <DefaultList surveys={surveys} />}
      </Stack>
    </Stack>
    );
};

export default Project;
