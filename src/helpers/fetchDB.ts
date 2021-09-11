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

export const fetchDB = (table: string, filter: string = '', select: string[] = ['*']) : any => {
  try {
    return fetch(`${apiUrl}/${table}?${filter}&select=${[...select]}`, { headers: { apiKey } })
    .then((res) => res.json())
    .then((data) => data);
  } catch ({ message }) {
    return console.log(message);
  }
};
