// These functions use gcloud cli to connect.

import { spawn } from 'child_process';

export async function getProjectsGC() {
    return new Promise((resolve, reject) => {
        const gcloudProjects = spawn('gcloud', ['projects', 'list', '--filter', 'labels.firebase:enabled'], { stdio: 'pipe' });

        let projects = '';

        gcloudProjects.stdout.on('data', (data) => {
            projects += data.toString();
        });

        gcloudProjects.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        gcloudProjects.on('close', (code) => {
            console.log(projects)
            if (code === 0) {
                resolve(projects);
            } else {
                reject(`Gcloud projects failed with code ${code}`);
            }
        });
    });
}