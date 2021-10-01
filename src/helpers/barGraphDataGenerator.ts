import { getHADBackgroundColor, getTotalDTSBackgroundColor } from './getColors';

type RawData = {
    date: string, dtsSum: number, hadASum: number, hadDSum: number
};

type Result = {
    hadAData: any[],
    hadDData: any[],
    dtsData: any[],
    hadAColors: any[],
    hadDColors: any[],
    dtsColors: any[],

};
const barGraphDataGenerator = (rawData : RawData) => {
    const result: Result = {
        hadAData: [],
        hadDData: [],
        dtsData: [],
        hadAColors: [],
        hadDColors: [],
        dtsColors: [],
    };
    rawData.forEach((element: RawData) => {
      result.hadAData = [
          ...result.hadAData,
          { date: new Date(element.date).toLocaleDateString(), value: element.hadASum }];
      result.hadDData = [
          ...result.hadDData,
          { date: new Date(element.date).toLocaleDateString(), value: element.hadDSum }];
      result.dtsData = [
          ...result.dtsData,
          { date: new Date(element.date).toLocaleDateString(), value: element.dtsSum }];
      result.hadAColors = [
          ...result.hadAColors, getHADBackgroundColor(element.hadASum)];
      result.hadDColors = [
          ...result.hadDColors, getHADBackgroundColor(element.hadDSum)];
      result.dtsColors = [
          ...result.dtsColors, getTotalDTSBackgroundColor(element.dtsSum)];
    });
    return result;
  };

  export default barGraphDataGenerator;
