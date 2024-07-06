// This will set up a web app for the firebase project

import { google } from "googleapis";
const firebase = google.firebase('v1beta1');
import inquirer from "inquirer";
import path from "path";
import fs from "fs";

const WEB_APP_CREDS_LOCATION = path.join(process.cwd(), "firebase-app-config.js");

export async function setWebApp(selectedProject) {
    await setupGoogleAuth(google)
    var apps = (await firebase.projects.webApps.list({
        parent: `projects/${selectedProject}`
    })).data.apps;
    const selectedApp = await selectApp(apps, selectedProject);
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

async function selectApp(apps, selectedProject) {
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
        if (await createWebApp(apps, selectedProject) == "created") {
            apps = (await firebase.projects.webApps.list({
                parent: `projects/${selectedProject}`
            })).data.apps;
            return selectApp(apps, selectedProject);
        }
    }
    return selectedApp.selectedApp;
}

// NOTE: Create function call will not return the appId. It instead returns a workflow.
// Instead of checking the workflow, the idea is to keep checking for apps list until the new app is created.
async function createWebApp(apps, selectedProject) {
    const oldAppCount = apps ? apps.length : 0;
    const newApp = await inquirer.prompt([
        {
            type: 'input',
            name: 'displayName',
            message: 'Enter the display name for the new app : ',
            default: "My FirebaseNextJS App"
        },
    ])
    const resp = await firebase.projects.webApps.create({
        parent: `projects/${selectedProject}`,
        requestBody: {
            displayName: newApp.displayName,
            appUrls: [],
        }
    })
    console.log("🧑‍🍳 Creating app 🧑‍🍳")
    for (let i = 0; i < 15; i++) {
        const newApps = (await firebase.projects.webApps.list({
            parent: `projects/${selectedProject}`
        })).data.apps;
        if (newApps != undefined && (newApps.length > oldAppCount)) {
            console.log("👶🏻 App created 👶🏻")
            return "created"
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    throw Error("App creation failed. Please try again.")
}

async function saveCreds(selectedProject, selectedApp) {
    var config = (await firebase.projects.webApps.getConfig({
        name: `projects/${selectedProject}/webApps/${selectedApp}/config`
    })).data
    config = "export const firebaseConfig = " + JSON.stringify(config, null, 2)
    config = `import { initializeApp } from "firebase/app";\n\n` + config
    config = config + `\n\nexport const firebaseApp = initializeApp(firebaseConfig);`
    fs.writeFileSync(WEB_APP_CREDS_LOCATION, config);
}