/* eslint-disable camelcase */

export type Projects = {
    projects: iProjects[] | null
};

export interface iProjects {
    project_name: string,
    id: number
}
