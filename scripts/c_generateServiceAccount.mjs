// This is to generate a service account credential for firebase

import inquirer from 'inquirer';
import path from 'path';
import { google } from 'googleapis';
import fs from 'fs';

const SERVICE_ACCOUNT_CREDS_LOCATION = path.join(process.cwd(), "firebase-service-account.json");

export async function generateServiceAccount(selectedProject, auth) {
    const serviceAccounts = await getServiceAccounts(selectedProject, auth);
    const selectedServiceAccount = await selectServiceAccount(serviceAccounts);
    await storeKey(selectedServiceAccount, selectedProject, auth);
}

async function getServiceAccounts(selectedProject, auth) {
    const iam = google.iam({
        version: 'v1',
        auth
    });

    const serviceAccounts = await iam.projects.serviceAccounts.list({
        name: `projects/${selectedProject}`,
    });

    return serviceAccounts.data.accounts;
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

async function storeKey(serviceAccount, selectedProject, auth) {
    const iam = google.iam({
        version: 'v1',
        auth
    });
    const resp = await iam.projects.serviceAccounts.keys.create({
        name: `projects/${selectedProject}/serviceAccounts/${serviceAccount}`,
    });
    const key = resp.data.privateKeyData;
    const keyStr = Buffer.from(key, 'base64').toString('utf-8');
    fs.writeFileSync(SERVICE_ACCOUNT_CREDS_LOCATION, keyStr);
    return;
}