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

export const createPatient = async (data: any, token: string | undefined) => {
  const response = await fetch(`${apiUrl}/patient`, {
    headers: {
 apiKey, 'Content-Type': 'application/json', Prefer: 'return=representation', Authorization: `Bearer ${token}`,
},
    body: JSON.stringify(data),
    method: 'POST',
  });
  if (!response.ok) {
    const message:string = 'Something went wrong.';
    throw new Error(message);
  }
};
export const postNote = (data: any, token: string | undefined) => fetch(`${apiUrl}/note`, {
      headers: {
 apiKey, 'Content-Type': 'application/json', Prefer: 'return=representation', Authorization: `Bearer ${token}`,
},
      body: JSON.stringify(data),
      method: 'POST',
});
export const deleteNote = async (id: number, token: string | undefined) => {
  const response = await fetch(`${apiUrl}/note?id=eq.${id}`, {
    headers: {
      apiKey, 'Content-Type': 'application/json', Prefer: 'return=representation', Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
});
  const json = await response.json();
    if (!response.ok) {
      const message:string = 'Something went wrong.';
      throw new Error(message);
    }
    if (!json.length) {
      const message:string = 'You can only remove your own notes.';
      throw new Error(message);
    }
};
export const deleteNoteByPatientId = async (id: number, token: string | undefined) => {
  const response = await fetch(`${apiUrl}/note?patient_id=eq.${id}`, {
    headers: { apiKey, 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    method: 'DELETE',
});
    if (!response.ok) {
      const message:string = 'Something went wrong.';
      throw new Error(message);
    }
};
export const deleteEvaluation = async (id: number, date: string, token: string | undefined) => {
  const response = await fetch(`${apiUrl}/answer?patientID=eq.${id}&date=eq.${formatToDbDate(date)}`, {
    headers: { apiKey, 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    method: 'DELETE',
});
    if (!response.ok) {
      const message:string = 'Something went wrong.';
      throw new Error(message);
    }
};
