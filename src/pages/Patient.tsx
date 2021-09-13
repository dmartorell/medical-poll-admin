import {
 Stack, Text, Box, HStack, Spinner,
} from '@chakra-ui/react';
import React, { FC, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RiFolderUserLine } from 'react-icons/ri';
import { IoMdTime } from 'react-icons/io';
import TotalsList from '../components/TotalsList';
import { fetchDB } from '../helpers/fetchDB';
import getSurveys from '../helpers/getSurveys';
import formatToDbDate from '../helpers/formatToDbDate';
import NotFound from './NotFound';

const Patient: FC = () => {
  const {
    id,
    projectName,
  } = (useParams<{id: string, projectName: string, date: string}>());
  const { state }:any = useLocation<unknown>();
  const [surveys, setSurveys] = useState<any[]>([]);
  useEffect(() => {
    if (state) {
      setSurveys([]);
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(state.date)}`, ['patientID', 'project(project_name, id)'])
        .then((data:any[]) => {
          setSurveys(getSurveys(data));
        });
    }
  }, []);
  return (
    state
    ? (
      <Stack as="main" direction="column" alignItems="center">
        <Stack direction="column" maxWidth="1000px" w="100%" spacing="2em" mt={5}>
          <Stack spacing={0}>
            <Text as="h4" fontSize="sm" color="gray.400">
              {`PROJECT ${projectName}`}
            </Text>
            <HStack alignItems="center" spacing={2} pt={3}>
              <Box color="blue.700"><RiFolderUserLine size="22px" /></Box>
              <Text as="h2" fontSize="2xl" color="blue.700">
                {`Patient ${id}`}
              </Text>
            </HStack>
            <HStack alignItems="center" spacing={2}>
              <Box color="gray.400"><IoMdTime size="15px" /></Box>
              <Text as="h3" fontSize="sm" color="gray.400">
                {(new Date(state.date).toLocaleDateString('sp-SP', { day: '2-digit', month: 'short', year: 'numeric' }))}
              </Text>
            </HStack>

          </Stack>
          {surveys.length
        ? <TotalsList surveys={surveys} />
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
)
    : <NotFound />
);
 };

export default Patient;
