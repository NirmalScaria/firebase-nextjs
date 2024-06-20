import { spawn, exec } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';

// This is used to make sure that gcloud command is working, and that user is logged in.
export async function setupGcloud() {
    await verifyGcloud();
    await gCloudLogin();
}

var installing = false;

// This checks if gcloud is installed, and if not, installs it.
// Returns true if finally successfull, false if failed.
async function verifyGcloud() {
    return new Promise((resolve) => {
        const gcloud = spawn('gcloud', ['--version'], { stdio: 'pipe' });
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
            message: 'GCloud CLI not found, which is required for automatic setup. Install it now?'
        }
    ]);

    if (installGcloud) {
        // NOTE: Set node_modules/nextfirejs/scripts to the path.
        const installGcloud = spawn('sh', [path.join(path.join(process.cwd(), "scripts"), 'shellScripts/installGcloud.sh'), '--disable-prompts'], { stdio: 'inherit' });
        return new Promise((resolve, reject) => {
            installGcloud.on('error', (error) => {
                reject(`Error: ${error.message}`);
            });
            installGcloud.on('close', (code) => {
                if (code === 0) {
                    console.log("gcloud installation successful.")
                    resolve(true);
                } else {
                    reject(`gcloud installation failed with code ${code}`);
                }
            });
        });
    }
    else {
        console.error('ERROR: GCloud is required to continue automatic setup.');
        return "Denied"
    }
}

async function gCloudLogin() {
    return new Promise((resolve, reject) => {
        const firebaseLogin = exec('gcloud auth login');

        firebaseLogin.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        firebaseLogin.on('close', (code) => {
            if (code === 0) {
                resolve('Gcloud login successful!');
            } else {
                reject(`Gcloud login failed with code ${code}`);
            }
        });
    });
}