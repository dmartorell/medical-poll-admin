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
        hadASum: number,
        hadDSum: number,
        dtsFSum: number,
        dtsGSum: number,
        dtsTotal: number,
        date: string
    },
    fields: string[],
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
