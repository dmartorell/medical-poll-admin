/* eslint-disable camelcase */
import React, { FC, useState, useEffect } from 'react';
import { Stack, Spinner, Text } from '@chakra-ui/react';
import DefaultList from '../components/DefaultList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';

const Project: FC = () => {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    setSurveys([]);
    fetchDB('answer', undefined, ['patientID', 'project(project_name, id)', 'date'], 'order=date.desc')
      .then((data:any[]) => {
        setSurveys(getSurveys(data).slice(0, 5));
      });
  }, []);

  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Text as="h2" fontSize="3xl" color="blue.700">
          Latest Entries
        </Text>
        {surveys.length
        ? <DefaultList surveys={surveys} />
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

export default Project;
