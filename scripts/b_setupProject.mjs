import inquirer from 'inquirer';
import { google } from 'googleapis';

export async function setupProject(auth) {
    const projects = await getProjects(auth);
    console.log("Projects : ", projects)
    const selectedProject = await selectProject(projects);
    return selectedProject
}

async function getProjects(auth) {
    const cloudresourcemanager = google.cloudresourcemanager({
        version: 'v1',
        auth
    });

    const projects = await cloudresourcemanager.projects.list({
        filter: 'labels.firebase:enabled',
    });

    return projects.data.projects;
}

async function selectProject(projects) {
    const projectChoices = projects.map((project) => {
        return {
            name: project.name + '(' + project.projectId + ')',
            value: project.projectId,
        }
    });

    const selectedProject = await inquirer.prompt([
        {
            type: 'list',
            name: 'project',
            message: 'Select a Firebase project',
            choices: projectChoices,
        }
    ]);

    return selectedProject.project;
}