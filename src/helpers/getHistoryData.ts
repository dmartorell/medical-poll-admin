const getHistoryData = (sums: {
  date: string,
  hadASum: number,
  hadDSum: number,
  dtsSum: number,
}[]) => {
    const data: any = { dts: [], hadA: [], hadD: [] };
    sums.forEach(({
 date, dtsSum, hadASum, hadDSum,
 }) => {
      data.dts = [...data.dts, { x: new Date(date).toLocaleDateString('sp-SP'), y: dtsSum }];
      data.hadA = [...data.hadA, { x: new Date(date).toLocaleDateString('sp-SP'), y: hadASum }];
      data.hadD = [...data.hadD, { x: new Date(date).toLocaleDateString('sp-SP'), y: hadDSum }];
    });
    return data;
  };
export default getHistoryData;
