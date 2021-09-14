/* eslint-disable camelcase */

export type Projects = {
    projects: iProjects[] | null
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

export interface iSurvey {
    [key: string]: string | number | object,
    date: string,
    patientID: number,
    project: {
        project_name: string,
        id: number
    },
}
