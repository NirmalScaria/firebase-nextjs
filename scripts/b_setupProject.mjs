import { spawn } from 'child_process';
import inquirer from 'inquirer';

export async function setupProject() {
    const projects = await getProjects();
    const selectedProject = await selectProject(projects);
    await setProject(selectedProject);
    return selectedProject
}

async function getProjects() {
    return new Promise((resolve, reject) => {
        const gcloudProjects = spawn('gcloud', ['projects', 'list', '--filter', 'labels.firebase:enabled', '--format', 'json'], { stdio: 'pipe' });

        let projects = '';

        gcloudProjects.stdout.on('data', (data) => {
            projects += data.toString();
        });

        gcloudProjects.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        gcloudProjects.on('close', (code) => {
            projects = JSON.parse(projects);
            if (code === 0) {
                resolve(projects);
            } else {
                reject(`Gcloud projects failed with code ${code}`);
            }
        });
    });
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

async function setProject(projectId) {
    return new Promise((resolve, reject) => {
        const firebaseUse = spawn('gcloud', ['config', 'set', 'project', projectId], { stdio: 'inherit' });

        firebaseUse.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        firebaseUse.on('close', (code) => {
            if (code === 0) {
                resolve('Firebase project set successfully!');
            } else {
                reject(`Firebase project set failed with code ${code}`);
            }
        });
    });
}