import React, { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';

type Props = {
  data: any[]
};
const BarGraph: FC<Props> = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={['HAD-A', 'HAD-D']}
    indexBy="HADS"
    margin={{
      top: 50, right: 130, bottom: 50, left: 60,
    }}
    padding={0.4}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={['#e53e3e', '#38a169', '#f3c823']}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 0,
      tickPadding: 5,
      legend: 'HADS',
      legendPosition: 'middle',
      legendOffset: 22,
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
