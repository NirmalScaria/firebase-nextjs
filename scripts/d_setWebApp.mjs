// This will set up a web app for the firebase project

import { google } from "googleapis";
const firebase = google.firebase('v1beta1');
import inquirer from "inquirer";
import path from "path";
import fs from "fs";

const WEB_APP_CREDS_LOCATION = path.join(process.cwd(), "firebase-app-config.js");

export async function setWebApp(selectedProject) {
    await setupGoogleAuth()
    const apps = (await firebase.projects.webApps.list({
        parent: `projects/${selectedProject}`
    })).data.apps;
    const selectedApp = await selectApp(apps);
    await saveCreds(selectedProject, selectedApp);
}

async function setupGoogleAuth() {
    const auth = new google.auth.GoogleAuth({
        scopes: [
            'https://www.googleapis.com/auth/cloud-platform',
            'https://www.googleapis.com/auth/firebase',
        ],
        keyFilename: 'firebase-service-account.json'
    })
    const authClient = await auth.getClient();
    google.options({ auth: authClient });
}

async function selectApp(apps) {
    const appChoices = apps.map((app) => {
        return {
            name: app.displayName + '(' + app.appId + ')',
            value: app.appId,
        }
    });
    appChoices.push({ name: "Create a New Web App", value: "createnewappnow" });

    if (apps.length === 0) {
        console.log("No web apps found in the project! Please create an app.");
    }

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
        // call createApp function
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