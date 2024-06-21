// This will set up a web app for the firebase project

import { google } from "googleapis";
const firebase = google.firebase('v1beta1');
import inquirer from "inquirer";
import path from "path";
import fs from "fs";

const WEB_APP_CREDS_LOCATION = path.join(process.cwd(), "firebase-app-config.js");

export async function setWebApp(selectedProject) {
    await setupGoogleAuth(google)
    const apps = (await firebase.projects.webApps.list({
        parent: `projects/${selectedProject}`
    })).data.apps;
    const selectedApp = await selectApp(apps);
    await saveCreds(selectedProject, selectedApp);
}

export async function setupGoogleAuth(googleObject) {
    const auth = new googleObject.auth.GoogleAuth({
        scopes: [
            'https://www.googleapis.com/auth/cloud-platform',
            'https://www.googleapis.com/auth/firebase',
        ],
        keyFilename: 'firebase-service-account.json'
    })
    const authClient = await auth.getClient();
    googleObject.options({ auth: authClient });
}

async function selectApp(apps) {
    var appChoices = [];
    if (apps == undefined || apps.length === 0) {
        console.log("No web apps found in the project! Please create an app.");
    }
    else {
        appChoices = apps.map((app) => {
            return {
                name: app.displayName + '(' + app.appId + ')',
                value: app.appId,
            }
        });
    }
    appChoices.push({ name: "Create a New Web App", value: "createnewappnow" });

    const selectedApp = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedApp',
            message: 'Select an app',
            choices: appChoices
        }
    ]);

    if (selectedApp.selectedApp === "createnewappnow") {
        console.log("Creating a new app");
        throw new Error("Not implemented yet");
    }

    return selectedApp.selectedApp;
}

async function saveCreds(selectedProject, selectedApp) {
    var config = (await firebase.projects.webApps.getConfig({
        name: `projects/${selectedProject}/webApps/${selectedApp}/config`
    })).data
    config = "export const firebaseConfig = " + JSON.stringify(config, null, 2)
    fs.writeFileSync(WEB_APP_CREDS_LOCATION, config);
}