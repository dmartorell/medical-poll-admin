// import { iSurvey } from '../types';
// import toTimestamp from './toTimestamp';

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

export const fetchDB = (table: string, filter: string | undefined = '', select: string[] | undefined = ['*'], order: string | undefined = '') : any => {
  try {
    return fetch(`${apiUrl}/${table}?${filter}&select=${[...select]}&${order}`, { headers: { apiKey } })
    .then((res) => res.json())
    .then((data) => data);
  } catch ({ message }) {
    return console.log(message);
  }
};

export const postNote = (data: any) => {
  try {
    return fetch(`${apiUrl}/note`, {
      headers: { apiKey, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify(data),
      method: 'POST',
});
  } catch ({ message }) {
    return console.log(message);
  }
};
