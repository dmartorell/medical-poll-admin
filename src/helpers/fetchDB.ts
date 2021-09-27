import formatToDbDate from './formatToDbDate';

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

export const postNote = (data: any) => fetch(`${apiUrl}/note`, {
      headers: { apiKey, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify(data),
      method: 'POST',
});
export const deleteNote = async (id: number) => {
  const response = await fetch(`${apiUrl}/note?id=eq.${id}`, {
    headers: { apiKey, 'Content-Type': 'application/json' },
    method: 'DELETE',
});
    if (!response.ok) {
      const message:string = `Something went wrong: ${response.status}`;
      throw new Error(message);
    }
};
export const deleteNoteByPatientId = async (id: number) => {
  const response = await fetch(`${apiUrl}/note?patient_id=eq.${id}`, {
    headers: { apiKey, 'Content-Type': 'application/json' },
    method: 'DELETE',
});
    if (!response.ok) {
      const message:string = `Something went wrong: ${response.status}`;
      throw new Error(message);
    }
};
export const deleteEvaluation = async (id: number, date: string) => {
  const response = await fetch(`${apiUrl}/answer?patientID=eq.${id}&date=eq.${formatToDbDate(date)}`, {
    headers: { apiKey, 'Content-Type': 'application/json' },
    method: 'DELETE',
});
    if (!response.ok) {
      const message:string = `Something went wrong: ${response.status}`;
      throw new Error(message);
    }
};
