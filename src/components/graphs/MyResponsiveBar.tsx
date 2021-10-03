import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar:FC<Props> = ({
 data, colors, maxValue,
}) => (
  <ResponsiveBar
    data={data}
    indexBy="date"
    margin={{
      top: 20, right: 130, bottom: 50, left: 60,
    }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    maxValue={maxValue}
    colors={colors}
    colorBy="indexValue"
    borderRadius={5}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'History HAD-A',
            legendPosition: 'middle',
            legendOffset: 42,
        }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="white"

  />
);

export default MyResponsiveBar;
