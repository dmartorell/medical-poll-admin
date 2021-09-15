import {
 Stack, Text, Box, HStack, Spinner,
} from '@chakra-ui/react';
import React, { FC, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RiFolderUserLine } from 'react-icons/ri';
import { IoMdTime } from 'react-icons/io';
import TotalsList from '../components/TotalsList';
import { fetchDB } from '../helpers/fetchDB';
import formatToDbDate from '../helpers/formatToDbDate';
import NotFound from './NotFound';
import getSingleSum from '../helpers/getSingleSum';
import getDobleSum from '../helpers/getDobleSum';

const Patient: FC = () => {
  const {
    id,
    projectName,
  } = (useParams<{id: string, projectName: string, date: string}>());
  const { state: patientState }:any = useLocation<unknown>();
  const [hadA, setHadA] = useState<any[]>([]);
  const [hadD, setHadD] = useState<any[]>([]);
  const [dts, setDts] = useState<any[]>([]);
  const [mainResults, setMainResults] = useState<any>([]);

  const resetValues = () => {
    setHadA([]);
    setHadD([]);
    setDts([]);
  };
  // console.log({ hadA });
  // console.log({ hadD });
  // console.log({ dts });
  // console.log({ mainResults });

  useEffect(() => {
    if (patientState) {
      resetValues();
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}&question_category=eq.had-a`, ['questionID', 'answer'])
        .then((data:any[]) => {
          setHadA(data);
        });
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}&question_category=eq.had-d`, ['questionID', 'answer'])
        .then((data:any[]) => {
          setHadD(data);
        });
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}&question_category=eq.dts`, ['questionID', 'answer'])
        .then((data:any[]) => {
          setDts(data);
        });
    }
  }, []);

  useEffect(() => {
    if (patientState) {
      const { dtsFSum, dtsGSum } = getDobleSum(dts, 'dtsFSum', 'dtsGSum');
      const hadASum = getSingleSum(hadA);
      const hadDSum = getSingleSum(hadD);

      setMainResults(
        {
          'had-a': hadASum,
          'had-d': hadDSum,
          'had-total': hadASum + hadDSum,
          'dts-f': dtsFSum,
          'dts-g': dtsGSum,
          'dts-total': dtsFSum + dtsGSum,
        },
      );
    }
  }, [hadA, hadD, dts]);
  return (
    patientState
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
              <Box color="gray.600"><IoMdTime size="15px" /></Box>
              <Text as="h3" fontSize="sm" color="gray.600">
                {(new Date(patientState.date).toLocaleDateString('sp-SP', {
 day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
}))}
              </Text>
            </HStack>

          </Stack>
          {hadA.length
        ? (
          <TotalsList
            data={mainResults}
          />
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
)
    : <NotFound />
);
 };

export default Patient;
