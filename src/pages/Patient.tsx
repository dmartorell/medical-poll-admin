/* eslint-disable no-shadow */
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
import DetailsList from '../components/DetailsList';
import PieGraph from '../components/graphs/PieGraph';
import { getHADBackgroundColor } from '../helpers/getColors';
import LineGraph from '../components/graphs/LineGraph';
import getSurveys from '../helpers/getSurveys';
import getSumsFromHistory from '../helpers/getSumsFromHistory';
import getHistoryData from '../helpers/getHistoryData';

type HistoryData = {
  dts: [{x: string, y: number}],
  hadA: [{x: string, y: number}],
  hadD: [{x: string, y: number}],
};

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
  const [details, setDetails] = useState<any>([]);
  const [patientHistory, setPatientHistory] = useState<any>([]);
  const [historyData, setHistoryData] = useState<any>([]);
  const [historySums, setHistorySums] = useState<any>([]);

  useEffect(() => {
    setHistoryData([]);
    // setHistorySums([]);
    setHistorySums(getSumsFromHistory(patientHistory));
    setHistoryData(getHistoryData(historySums));
  }, [patientHistory]);

  console.log({ historySums });
  console.log({ historyData });
  console.log({ patientHistory });

  const hadsBarData = [
    {
      HADS: '',
      'HAD-A': mainResults['had-a'],
      'HAD-D': mainResults['had-d'],
    },
  ];
  const hadsBarColors = [
    getHADBackgroundColor(mainResults['had-a']), getHADBackgroundColor(mainResults['had-d']),
  ];
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

  const resetValues = () => {
    setHadA([]);
    setHadD([]);
    setDts([]);
  };
  useEffect(() => {
    if (patientState) {
      resetValues();
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
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(patientState.date)}`, ['answer', 'question_category', 'id', 'question(question)'], 'order=id.asc')
        .then((data:any[]) => {
          setDetails(data);
        });
    }
  }, []);

  useEffect(() => {
    if (patientState) {
      let dataObject: any[] = [];
      fetchDB('answer', `patientID=eq.${id}`, ['date'], 'order=date.desc')
      .then((data:any[]) => {
        dataObject = getSurveys(data);
        dataObject.forEach(({ date }, index: number) => {
          fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.had-a`, ['answer'])
        .then((data:any[]) => {
          dataObject[index].hadA = data;
        });
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.had-d`, ['answer'])
        .then((data:any[]) => {
          dataObject[index].hadD = data;
        });
      fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.dts`, ['answer'])
        .then((data:any[]) => {
          dataObject[index].dts = data;
          setPatientHistory(dataObject);
        });
        });
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
          <>
            <HStack justifyContent="center" w="100%" height="400px">
              <PieGraph data={hadsBarData} colors={hadsBarColors} />
              <LineGraph data={dtsLineData} />
            </HStack>
            <TotalsList
              data={mainResults}
            />
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
        </Stack>
      </Stack>
)
    : <NotFound />
);
 };

export default Patient;
