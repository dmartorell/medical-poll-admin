const toTimestamp = (strDate : string) => {
    const datum = Date.parse(strDate);
    return datum;
 };

 export default toTimestamp;
