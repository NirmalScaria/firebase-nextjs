// This is to generate a service account credential for firebase

import { spawn } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';

const SERVICE_ACCOUNT_CREDS_LOCATION = path.join(process.cwd(), "firebase-service-account.json");

export async function generateServiceAccount() {
    const serviceAccounts = await getServiceAccounts();
    const selectedServiceAccount = await selectServiceAccount(serviceAccounts);
    await storeKey(selectedServiceAccount);
}

async function getServiceAccounts() {
    return new Promise((resolve, reject) => {
        const firebaseProjects = spawn('gcloud', ['iam', 'service-accounts', 'list', '--format', 'json'], { stdio: 'pipe' });

        let output = '';

        firebaseProjects.stdout.on('data', (data) => {
            output += data.toString();
        });

        firebaseProjects.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        firebaseProjects.on('close', (code) => {
            if (code === 0) {
                resolve(JSON.parse(output))
            } else {
                reject(`Getting Service Accounts failed with code ${code}`);
            }
        });
    });
}

async function selectServiceAccount(serviceAccounts) {
    const serviceAccountChoices = serviceAccounts.map((serviceAccount) => {
        return {
            name: serviceAccount.displayName + " (" + serviceAccount.email + ")",
            value: serviceAccount.email,
        }
    });

    const selectedServiceAccount = await inquirer.prompt([
        {
            type: 'list',
            name: 'serviceAccount',
            message: 'Select a service account (firebase-adminsdk is recommended)',
            choices: serviceAccountChoices,
        }
    ]);

    return selectedServiceAccount.serviceAccount;
}

async function storeKey(serviceAccount) {
    return new Promise((resolve, reject) => {
        const firebaseProjects = spawn('gcloud', ['iam', 'service-accounts', 'keys', 'create', SERVICE_ACCOUNT_CREDS_LOCATION, '--iam-account', serviceAccount], { stdio: 'pipe' });

        firebaseProjects.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        firebaseProjects.on('close', (code) => {
            if (code === 0) {
                resolve('Key stored successfully!')
            } else {
                reject(`Key store failed with code ${code}`);
            }
        });
    });
}