const getSurveys = (array : any[]): any[] => {
    const cache: string[] = [];
    const filtered: any[] = [];
    array.forEach((element) => {
        if (!cache.includes(element.date)) {
            cache.push(element.date);
            filtered.push(element);
        }
    });
    return filtered;
};

export default getSurveys;
