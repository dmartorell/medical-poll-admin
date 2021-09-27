/* eslint-disable camelcase */

export type Projects = {
    projects: iProjects[]
};

export interface iProjects {
    project_name: string,
    id: number
}

export type Surveys = {
    surveys: iSurvey[]
    fields?: string[]

};

export type HadsDtsTotals = {
    data: {
        [key: string]: number,
        'had-a': number,
        'had-d': number,
        'dts-f': number,
        'dts-g': number,
        'dts-total': number,
    },
};

export type Details = {data: Detail[]};

export type Detail = {
    question: { question: string},
    answer: string[],
    question_category: string,
};

export interface iSurvey {
    [key: string]: string | number | object,
    date: string,
    patientID: number,
    project: {
        project_name: string,
        id: number
    },
}

export type PatientHistory = {
    date: string,
    hadA: [],
    hadD: [],
    dts: [],
  };
