import React, { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';

type Props = {
  data: any[],
  colors: string[],
};

const BarGraph: FC<Props> = ({ data, colors }) => (
  <ResponsiveBar
    data={data}
    keys={['HAD-A', 'HAD-D']}
    indexBy="HADS"
    margin={{
      top: 20, right: 130, bottom: 50, left: 60,
    }}
    padding={0.4}
    maxValue={42}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={colors}
    defs={[
      {
          id: 'lines',
          type: 'patternLines',
          background: (colors[0] === colors[1] ? `${colors[0]}f3` : 'inherit'),
          color: colors[1],
          rotation: -45,
          lineWidth: 6,
          spacing: 11,

      },
  ]}
    fill={[
      {
          match: {
              id: 'HAD-D',
          },
          id: 'lines',
      },
  ]}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 0,
      tickPadding: 5,
      legend: 'HADS',
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

export default BarGraph;
