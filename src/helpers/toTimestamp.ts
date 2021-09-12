const toTimestamp = (strDate : string) => {
    const datum = Date.parse(strDate);
    return datum / 1000;
 };

 export default toTimestamp;
