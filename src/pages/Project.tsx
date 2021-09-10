/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import TableList from '../components/TableList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';

const Project: FC = () => {
  const { name, id } = (useParams<{name: string, id: string}>());
  const [surveys, setSurveys] = useState<any[]>([]);
  console.log(surveys);

  useEffect(() => {
    fetchDB('answer', `project=eq.${id}`, ['patientID', 'date', 'project(project_name, id)'])
      .then((data:any[]) => setSurveys(getSurveys(data)));
  }, [id]);

  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Text as="h2" fontSize="4xl" color="blue.700">
          Project
          {' '}
          {name}
        </Text>
        <TableList />
      </Stack>
    </Stack>
    );
};

export default Project;
