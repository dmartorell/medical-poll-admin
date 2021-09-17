import React, { FC } from 'react';

import { ResponsiveLine } from '@nivo/line';

type Props = {
    data: any[],
  };

const LineGraph: FC<Props> = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{
 top: 50, right: 110, bottom: 50, left: 60,
}}
    xScale={{ type: 'point' }}
    yScale={{
 type: 'linear', min: 0, max: 136, stacked: true, reverse: false,
}}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 0,
      tickPadding: 5,
      legend: 'DTS',
      legendPosition: 'middle',
      legendOffset: 22,
    }}
    enableGridX={false}
    lineWidth={3}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    areaOpacity={0.1}
    useMesh
  />
);

export default LineGraph;
