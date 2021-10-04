import React, { FC } from 'react';

import { ResponsiveLine } from '@nivo/line';

type Props = {
    data: any[],
  };
const theme = {
  background: 'transparent',
};
const LineGraph: FC<Props> = ({ data }) => (
  <ResponsiveLine
    theme={theme}
    data={data}
    margin={{
 top: 20, right: 90, bottom: 50, left: 45,
}}
    xScale={{ type: 'point' }}
    yScale={{
 type: 'linear', min: 0, max: 136, stacked: false, reverse: false,
}}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 7,
      tickPadding: 6,
      tickRotation: 0,
      legend: 'GLOBAL',
      legendOffset: 40,
      legendPosition: 'middle',
  }}
    enableGridX
    colors={[data[0].color, data[1].color, data[2].color]}
    curve="monotoneX"
    lineWidth={1.6}
    pointSize={4}
    pointColor={{ from: 'color', modifiers: [] }}
    pointBorderWidth={1}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    enableSlices="x"
    motionConfig="gentle"
    useMesh
    legends={[
      {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 1,
          symbolSize: 9,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',

      },
  ]}
  />
);

export default LineGraph;
