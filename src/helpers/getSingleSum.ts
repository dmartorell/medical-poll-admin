const getSingleSum = (array: object[]) => array
    .reduce((total: number, current: any) => Number(total) + Number(current.answer), 0);

export default getSingleSum;
