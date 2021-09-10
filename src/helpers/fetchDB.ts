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

export const fetchPatientId = (code : number) : any => {
  try {
    return fetch(`${apiUrl}/patient?id=eq.${code}`, { headers: { apiKey } });
  } catch ({ message }) {
    return console.log(message);
  }
};
