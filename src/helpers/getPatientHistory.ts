/* eslint-disable no-shadow */
import { fetchDB } from './fetchDB';
import formatToDbDate from './formatToDbDate';
import getSurveys from './getSurveys';

const getPatientHistory = async (id:number) => {
    const allAnswers = await fetchDB('answer', `patientID=eq.${id}`, ['date'], 'order=date.desc');
    const rawData: any[] = getSurveys(allAnswers);
    const result: any = [];
    rawData.forEach(({ date }) => {
        const hadA = fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.had-a`, ['answer']);
        const hadD = fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.had-d`, ['answer']);
        const dts = fetchDB('answer', `patientID=eq.${id}&date=eq.${formatToDbDate(date)}&question_category=eq.dts`, ['answer']);
        Promise.all([hadA, hadD, dts]).then((values) => {
            result.push({
                date, hadA: values[0], hadD: values[1], dts: values[2],
            });
        });
    });
    return result;
};

export default getPatientHistory;
