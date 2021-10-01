import React, { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useMediaQuery } from '@chakra-ui/react';

type Props = {
  data: any[],
  colors: string[],
  maxValue: number,
  legend: string,

};

const BarGraph: FC<Props> = ({
 data, colors, maxValue, legend,
}) => {
  const [isLargerThan450] = useMediaQuery('(max-width: 450px)');

  return (
    <ResponsiveBar
      data={data}
      indexBy="date"
      margin={{
        top: 20, right: 130, bottom: 50, left: 60,
      }}
      padding={isLargerThan450 ? 0.4 : 0.6}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      maxValue={maxValue}
      colors={colors}
      colorBy="indexValue"
      borderRadius={2}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 0,
              legend,
              legendPosition: 'middle',
              legendOffset: 42,
          }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="white"

    />
  );
};
export default BarGraph;
