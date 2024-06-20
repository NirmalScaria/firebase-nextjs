import { spawn } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';

var installing = false;

export async function verifyFirebaseTools() {
    return new Promise((resolve, reject) => {
        console.log("Trying")
        const firebase = spawn('firebase', ['--version'], { stdio: 'pipe' });
        let firebaseOutput = '';
        firebase.stdout.on('data', (data) => {
            firebaseOutput += data.toString();
        });
        firebase.on('error', async (error) => {
            if (!installing) {
                resolve(await installFirebaseTools());
            }
        });
        firebase.on('close', async (code) => {
            if (code === 0) {
                resolve(true)
            } else {
                if (!installing) {
                    resolve(await installFirebaseTools());
                }
            }
        });
    })
}

async function installFirebaseTools() {
    if (installing) return;
    installing = true;
    const { installFirebaseTools } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'installFirebaseTools',
            message: 'Firebase CLI not found. It is required for automatic setup. Install it now?'
        }
    ]);

    if (installFirebaseTools) {
        const installFirebaseTools = spawn('sh', [path.join(path.join(process.cwd(), "node_modules/nextfirejs/scripts"), 'installFirebaseTools.sh')], { stdio: 'inherit' });
        return new Promise((resolve, reject) => {
            installFirebaseTools.on('error', (error) => {
                reject(`Error: ${error.message}`);
            });
            installFirebaseTools.on('close', (code) => {
                if (code === 0) {
                    console.log("SUCCESSFULLY INSTALLED FIREBASE TOOLS")
                    resolve(true);
                } else {
                    reject(`firebase installation failed with code ${code}`);
                }
            });
        });
    }
    else {
        console.error('ERROR: Firebase Tools is continue automatic setup.');
        return "Denied"
    }
}