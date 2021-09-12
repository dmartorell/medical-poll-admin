/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import DefaultList from '../components/DefaultList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';

const Project: FC = () => {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    fetchDB('answer', undefined, ['patientID', 'project(project_name, id)', 'date'])
      .then((data:any[]) => {
        setSurveys(getSurveys(data).slice(0, 5));
      });
  }, []);

  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Text as="h2" fontSize="4xl" color="blue.700">
          Latest Updates
        </Text>
        {surveys.length && <DefaultList surveys={surveys} />}
      </Stack>
    </Stack>
    );
};

export default Project;
