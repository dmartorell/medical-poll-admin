const getSingleSum = (array: object[] = [], valueIndexPosition:number = 0) => array
    .reduce((total: number, current: any) => Number(total)
    + Number(current.answer[valueIndexPosition]), 0);
export default getSingleSum;
