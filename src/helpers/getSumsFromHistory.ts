import getSingleSum from './getSingleSum';
import getDobleSum from './getDobleSum';
import formatToDbDate from './formatToDbDate';

type Entry = {
    hadA: object[],
    hadD: object[],
    dts: object[],
    date: string
};
const getSumsFromHistory = (history: Entry[]) => {
    const result: object[] = [];
    history.forEach((entry: Entry) => {
        const entryResult = {
 hadASum: 0, hadDSum: 0, dtsSum: {}, date: '',
};
        entryResult.hadASum = getSingleSum(entry.hadA);
        entryResult.hadDSum = getSingleSum(entry.hadD);
        const { frecuencia, gravedad } = getDobleSum(entry.dts, 'frecuencia', 'gravedad');
        entryResult.dtsSum = frecuencia + gravedad;
        entryResult.date = formatToDbDate(entry.date);
        result.push(entryResult);
    });
    return result;
};

export default getSumsFromHistory;
