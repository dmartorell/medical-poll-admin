import getSingleSum from './getSingleSum';

const getDobleSum = (array: object[] = [], field1: string, field2: string) => {
    const totalA = getSingleSum(array, 0);
    const totalB = getSingleSum(array, 1);
    return { [field1]: totalA, [field2]: totalB };
  };

export default getDobleSum;
