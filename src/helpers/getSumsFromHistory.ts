import getSingleSum from './getSingleSum';
import getDobleSum from './getDobleSum';
import formatToDbDate from './formatToDbDate';

type Entry = {
    hadA: object[],
    hadD: object[],
    dts: object[],
    date: string,
};
const getSumsFromHistory = (history: Entry[]) => {
    const mapped = history.map((entry: Entry) => {
    const { frecuencia, gravedad } = getDobleSum(entry.dts, 'frecuencia', 'gravedad');
    const { date } = entry;
    const hadASum = getSingleSum(entry.hadA);
    const hadDSum = getSingleSum(entry.hadD);
    const dtsSum = frecuencia + gravedad;

    return {
        date,
        hadASum,
        hadDSum,
        dtsSum,
        };
  });
return mapped;
};

export default getSumsFromHistory;
