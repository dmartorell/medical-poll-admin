import React, { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useMediaQuery } from '@chakra-ui/react';

type Props = {
  data: any[],
  colors: string[],
  keys: string[],
  indexBy: string,
  maxValue: number,

};

const BarGraph: FC<Props> = ({
 data, colors, keys, indexBy, maxValue,
}) => {
  const [isLargerThan650] = useMediaQuery('(max-width: 1050px)');

return (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy={indexBy}
    margin={{
      top: 20, right: 130, bottom: 50, left: 60,
    }}
    // eslint-disable-next-line no-nested-ternary
    padding={isLargerThan650 ? 0.5 : 0.2}
    innerPadding={2}
    maxValue={maxValue}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={colors}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 0,
      tickPadding: 5,
      legend: indexBy,
      legendPosition: 'middle',
      legendOffset: 40,
  }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legendPosition: 'middle',
      legendOffset: -40,
  }}
    enableLabel={false}
    labelSkipWidth={15}
    labelSkipHeight={11}
    labelTextColor={{ from: 'color', modifiers: [['darker', 3.6]] }}
  />
);
};

export default BarGraph;
