/* eslint-disable camelcase */
import React, {
 FC, useState, useEffect, memo,
} from 'react';
import {
 Stack, Spinner, Text,
} from '@chakra-ui/react';
import DefaultList from '../components/DefaultList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';
import EvaluationCreator from '../components/EvaluationCreator';
import { Projects } from '../types';

const Project: FC<Projects> = ({ projects }) => {
  const [surveys, setSurveys] = useState<any[]>([]);

  useEffect(() => {
    fetchDB('answer', undefined, ['patientID', 'project(project_name, id)', 'date'], 'order=date.desc')
      .then((data:any[]) => {
        setSurveys(getSurveys(data).slice(0, 5));
      });
      return () => {
        setSurveys([]);
      };
  }, []);

  return (
    <Stack as="main" direction="column" alignItems="center">
      <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
        <Text as="h2" fontSize={{ base: 'xl', md: 'xl', lg: '3xl' }} color="blue.700">
          Latest Evaluations
        </Text>
        {surveys.length
        ? (
          <>
            <DefaultList surveys={surveys} />
            <EvaluationCreator projects={projects} />
          </>
)
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

export default memo(Project);
