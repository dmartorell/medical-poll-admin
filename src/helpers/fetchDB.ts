import { iSurvey } from '../types';
import toTimestamp from './toTimestamp';

const apiKey: any = import.meta.env.VITE_SUPABASE_ANON_KEY;
const apiUrl: any = import.meta.env.VITE_SUPABASE_URL;

export const fetchProjectNames = () : any => {
    try {
        return fetch(`${apiUrl}/project?select=*`, { headers: { apiKey } })
          .then((res) => res.json())
          .then((data) => data);
      } catch ({ message }) {
        return console.log(message);
      }
};

export const fetchDB = (table: string, filter: string | undefined = '', select: string[] | undefined = ['*']) : any => {
  try {
    return fetch(`${apiUrl}/${table}?${filter}&select=${[...select]}`, { headers: { apiKey } })
    .then((res) => res.json())
    .then((data) => data
    // sort by timeStamp
        .sort((a: iSurvey, b: iSurvey) => toTimestamp(b.date) - toTimestamp(a.date)));
  } catch ({ message }) {
    return console.log(message);
  }
};
