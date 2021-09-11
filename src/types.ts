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
};

export interface iSurvey {
    date: string,
    patientID: number,
    project: {
        project_name: string,
        id: number
    }
}
