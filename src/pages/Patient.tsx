/* eslint-disable no-shadow */
import {
 Stack, Text, Box, Flex, HStack, Spinner, Grid, GridItem,
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
import DetailsList from '../components/DetailsList';
import BarGraph from '../components/graphs/BarGraph';
import LineGraph from '../components/graphs/LineGraph';
import getSurveys from '../helpers/getSurveys';
import getSumsFromHistory from '../helpers/getSumsFromHistory';
import getHistoryData from '../helpers/getHistoryData';
import AllEntriesList from '../components/AllEntriesList';
import NotesComponent from '../components/NotesComponent';
import AddNoteDrawer from '../components/AddNoteDrawer';
import DeleteEvaluationButton from '../components/DeleteEvaluationButton';
import { PatientHistory } from '../types';
import barGraphDataGenerator from '../helpers/barGraphDataGenerator';

const Patient: FC = () => {
  const {
    id,
    projectName,
  } = (useParams<{id: string, projectName: string, timestamp: string}>());
  const { state: patientState }:any = useLocation<unknown>();
  const [hadA, setHadA] = useState<any[]>([]);
  const [hadD, setHadD] = useState<any[]>([]);
  const [dts, setDts] = useState<any[]>([]);
  const [mainResults, setMainResults] = useState<any>([]);
  const [details, setDetails] = useState<any>([]);
  const [patientHistory, setPatientHistory] = useState<any>([]);
  const [historyData, setHistoryData] = useState<any>([]);
  const [historySums, setHistorySums] = useState<any>([]);
  const [patientNotes, setPatientNotes] = useState<any>([]);
  const [evaluationsList, setEvaluationsList] = useState<string[]>([]);

  const {
    hadAData,
    hadDData,
    dtsData,
    hadAColors,
    hadDColors,
    dtsColors,
} = barGraphDataGenerator(historySums);

  const MAX_VALUES = {
    hadA: 21,
    hadD: 21,
    dts: 136,
  };

  const dtsLineData = [
    {
      id: 'DTS-T',
      color: 'hsl(213, 64%, 42%)',
      data: historyData.dts,
    },
    {
      id: 'HAD-A',
      color: 'hsl(214, 20%, 69%)',
      data: historyData.hadA,
    },
    {
      id: 'HAD-D',
      color: 'hsl(212, 26%, 33%)',
      data: historyData.hadD,
    },
  ];

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

  useEffect(() => {
    if (patientState) {
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}&question_category=eq.had-a`, ['answer'])
        .then((data:any[]) => {
          setHadA(data);
        });
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}&question_category=eq.had-d`, ['answer'])
        .then((data:any[]) => {
          setHadD(data);
        });
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}&question_category=eq.dts`, ['answer'])
        .then((data:any[]) => {
          setDts(data);
        });
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}`, ['answer', 'question_category', 'id', 'question(question)'], 'order=question_category.desc')
        .then((data:any[]) => {
          setDetails(data);
        });
    }
  }, [patientState]);

  useEffect(() => {
    if (patientState) {
      getPatientHistory(Number(id));
    }
    async function getPatientHistory(id:number) {
      const allAnswers = await fetchDB('answer', `patientID=eq.${id}`, ['date'], 'order=date.asc');
      const rawData: any[] = getSurveys(allAnswers);
      const mapped = await Promise.all(
        rawData.map(async ({ date }) => {
          const hadA = fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.had-a`, ['answer']);
          const hadD = fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.had-d`, ['answer']);
          const dts = fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.dts`, ['answer']);
          return {
            date, hadA: await hadA, hadD: await hadD, dts: await dts,
          };
        }),
      );

      const total = mapped;
      setPatientHistory(total);
    }
  }, []);
  useEffect(() => {
    const data = getHistoryData(historySums);
    setHistoryData(data);
  }, [historySums]);

  useEffect(() => {
    const data = getSumsFromHistory(patientHistory);
    setHistorySums(data);
  }, [patientHistory]);

  useEffect(() => {
    setEvaluationsList(patientHistory.map(({ date } : PatientHistory) => date));
}, [patientHistory]);

  useEffect(() => {
    try {
      fetchDB('note', `patient_id=eq.${id}&survey_date=eq.${formatToDbDate(patientState.date)}`, ['text', 'created_by', 'saved_at', 'id'])
        .then((data:any[]) => {
          setPatientNotes(data);
        });
      } catch (err) {
        console.error(err);
      }
      }, [patientNotes.length, patientState]);
      return (
    patientState
    ? (
      <Stack as="main" direction="column" alignItems="center">
        <Stack direction="column" maxWidth="1200px" w="100%" spacing="2em" mt={5}>
          <HStack justifyContent="space-between" alignItems="flex-end">
            <Stack spacing={0}>
              <Text as="h4" fontSize={{ base: 'xs', md: 'xs', lg: 'sm' }} color="gray.400">
                {`PROJECT ${projectName}`}
              </Text>
              <HStack alignItems="center" spacing={2} pt={3}>
                <Box color="blue.700"><RiFolderUserLine size="22px" /></Box>
                <Text as="h2" fontSize={{ base: '1.2em', md: '1.2em', lg: '1.8em' }} color="blue.700">
                  {`Patient ${id}`}
                </Text>
              </HStack>
              <HStack alignItems="center" spacing={2}>
                <Box color="gray.600"><IoMdTime size="15px" /></Box>
                <Text as="h3" fontSize={{ base: 'xs', md: 'xs', lg: 'sm' }} color="gray.600">
                  {(new Date(patientState.date).toLocaleDateString('sp-SP', {
 day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
}))}
                </Text>
              </HStack>
            </Stack>
            <HStack>
              <DeleteEvaluationButton
                patientId={Number(id)}
                currentDate={patientState.date}
                list={evaluationsList}
                updateList={setEvaluationsList}
              />
            </HStack>
          </HStack>

          {patientHistory.length
        ? (
          <>
            <Flex
              backgroundColor="rgba(247, 250, 252, 0.4)"
              p={5}
              boxShadow="base"
              borderWidth="0.5px"
              borderRadius="lg"
              overflow="hidden"
              justifyContent={{ sm: '', lg: 'center' }}
              alignItems={{ sm: 'center', lg: '' }}
              direction={{ sm: 'column', md: 'row', lg: 'row' }}
            >

              <Grid
                h="100%"
                w="100%"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={5}
              >
                <GridItem rowSpan={2} colSpan={3} colStart={1} colEnd={7}>
                  <Box w={{ sm: '100%', md: '70%', lg: '60%' }} h={{ sm: '300px', md: '300px', lg: '300px' }}>
                    <LineGraph data={dtsLineData} />
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box w={{ sm: '100%', md: '100%', lg: '100%' }} h={{ sm: '300px', md: '300px', lg: '300px' }}>
                    <BarGraph legend="HAD-A" data={hadAData} maxValue={MAX_VALUES.hadA} colors={hadAColors} />
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box w={{ sm: '100%', md: '100%', lg: '100%' }} h={{ sm: '300px', md: '300px', lg: '300px' }}>
                    <BarGraph legend="HAD-D" data={hadDData} maxValue={MAX_VALUES.hadD} colors={hadDColors} />
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box w={{ sm: '100%', md: '100%', lg: '100%' }} h={{ sm: '300px', md: '300px', lg: '300px' }}>
                    <BarGraph legend="DTS" data={dtsData} maxValue={MAX_VALUES.dts} colors={dtsColors} />
                  </Box>
                </GridItem>
              </Grid>
            </Flex>
            <TotalsList data={mainResults} />
            <DetailsList data={details} />
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
          {
          patientHistory.length
          && (
          <HStack justifyContent="center" alignItems="flex-start" spacing={8}>
            <AllEntriesList
              dates={
              evaluationsList
            }
            />
            <NotesComponent
              notes={patientNotes}
              setNotes={setPatientNotes}
            >
              <AddNoteDrawer
                patientId={id}
                projectName={projectName}
                surveyDate={patientState.date}
                notes={patientNotes}
                setNotes={setPatientNotes}
              />
            </NotesComponent>
          </HStack>
)
        }
        </Stack>

      </Stack>
)
    : <NotFound />
);
 };

export default Patient;
