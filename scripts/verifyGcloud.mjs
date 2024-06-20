import { spawn } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';

var installing = false;

export async function verifyGcloud() {
    return new Promise((resolve, reject) => {
        const gcloud = spawn('gcloud', ['--version'], { stdio: 'pipe' });
        let gcloudOutput = '';
        gcloud.stdout.on('data', (data) => {
            gcloudOutput += data.toString();
        });
        gcloud.on('error', async (error) => {
            if (!installing) {
                resolve(await installGCloud());
            }
        });
        gcloud.on('close', async (code) => {
            if (code === 0) {
                resolve(true)
            } else {
                if (!installing) {
                    resolve(await installGCloud());
                }
            }
        });
    })
}

async function installGCloud() {
    if (installing) return;
    installing = true;
    const { installGcloud } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'installGcloud',
            message: 'GCloud CLI not found. It is required for automatic setup. Install it now?'
        }
    ]);

    if (installGcloud) {
        const installGcloud = spawn('sh', [path.join(path.join(process.cwd(), "node_modules/nextfirejs/scripts"), 'installGcloud.sh')], { stdio: 'inherit' });
        return new Promise((resolve, reject) => {
            installGcloud.on('error', (error) => {
                reject(`Error: ${error.message}`);
            });
            installGcloud.on('close', (code) => {
                if (code === 0) {
                    console.log("SUCCESSFULLY INSTALLED GCLOUD")
                    resolve(true);
                } else {
                    reject(`gcloud installation failed with code ${code}`);
                }
            });
        });
    }
    else {
        console.error('ERROR: GCloud is continue automatic setup.');
        return "Denied"
    }
}