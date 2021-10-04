import React, { FC, useMemo } from 'react';
import {
    Box, Flex, Grid, GridItem,
   } from '@chakra-ui/react';
import LineGraph from './LineGraph';
import BarGraph from './BarGraph';
import barGraphDataGenerator from '../../helpers/barGraphDataGenerator';

  const MAX_VALUES = {
    hadA: 21,
    hadD: 21,
    dts: 136,
  };

  type Props = {
    historySums: any,
    historyData: any,
  };

const Graphs: FC<Props> = ({ historySums, historyData }) => {
    console.log('graphs re rendered');
    const {
        hadAData,
        hadDData,
        dtsData,
        hadAColors,
        hadDColors,
        dtsColors,
    } = useMemo(() => {
        console.log('dataGenerator called');
        return barGraphDataGenerator(historySums);
}, [historySums]);

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

    return (
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
            <Box w={{ sm: '100%', md: '70%', lg: '50%' }} h={{ sm: '300px', md: '300px', lg: '290px' }}>
              <LineGraph data={dtsLineData} />
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box w={{ sm: '100%', md: '100%', lg: '100%' }} h={{ sm: '300px', md: '300px', lg: '250px' }}>
              <BarGraph legend="HAD-A" data={hadAData} maxValue={MAX_VALUES.hadA} colors={hadAColors} />
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box w={{ sm: '100%', md: '100%', lg: '100%' }} h={{ sm: '300px', md: '300px', lg: '250px' }}>
              <BarGraph legend="HAD-D" data={hadDData} maxValue={MAX_VALUES.hadD} colors={hadDColors} />
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box w={{ sm: '100%', md: '100%', lg: '100%' }} h={{ sm: '300px', md: '300px', lg: '250px' }}>
              <BarGraph legend="DTS" data={dtsData} maxValue={MAX_VALUES.dts} colors={dtsColors} />
            </Box>
          </GridItem>
        </Grid>
      </Flex>
    );
};

export default Graphs;
