import { spawn } from 'child_process';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';

function formatApps(appsList) {
    var lines = appsList.split("\n");
    lines = lines.filter(line => line.match(/[a-z]/i))
    var apps = lines.map(line => line.split('│'))
    apps.shift();
    apps = apps.filter(app => app.length > 2)
    apps = apps.map(app => {
        return {
            displayName: app[1].trim(),
            appId: app[2].trim(),
            platform: app[3].trim()
        }
    })
    return apps
}

async function getApps(selectedProject) {
    return new Promise((resolve, reject) => {
        const firebaseProjects = spawn('firebase', ['apps:list', "--project", selectedProject], { stdio: 'pipe' });

        let projects = '';

        firebaseProjects.stdout.on('data', (data) => {
            projects += data.toString();
        });

        firebaseProjects.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        firebaseProjects.on('close', (code) => {
            if (code === 0) {
                resolve(projects);
            } else {
                reject(`Firebase getApps failed with code ${code}`);
            }
        });
    });
}

async function chooseApp(apps) {
    if (apps.length === 0) {
        console.log("No web apps found in the project. Please create an app first.");
    }
    // inquirer prompt to select app. give option to create new app also.
    // if create new app is selected, call createApp function.

    var appChoices = apps.map((app) => {
        return {
            name: app.displayName + '(' + app.appId + ')',
            value: app.appId,
        }
    });
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
        // call createApp function
    }

    return selectedApp.selectedApp;
}

async function getConfig(selectedApp) {
    return new Promise((resolve, reject) => {
        const firebaseProjects = spawn('firebase', ['apps:sdkconfig', "WEB", selectedApp], { stdio: 'pipe' });

        let output = '';

        firebaseProjects.stdout.on('data', (data) => {
            output += data.toString();
        });

        firebaseProjects.on('error', (error) => {
            reject(`Error: ${error.message}`);
        });

        firebaseProjects.on('close', (code) => {
            if (code === 0) {
                resolve(output)
            } else {
                reject(`Firebase getConfig failed with code ${code}`);
            }
        });
    });
}

async function formatConfig(config) {
    // replace "firebase.initializeApp({" with "export const firebaseConfig = {"
    // and add "};"
    config = config.replace("firebase.initializeApp({", "export const firebaseConfig = {")
    config = config.replace("});", "};")
    return config
}

export async function generateWebApp(selectedProject) {

    const appsList = await getApps(selectedProject);
    const apps = formatApps(appsList);
    const selectedApp = await chooseApp(apps);
    const appConfig = await getConfig(selectedApp)
    const formattedConfig = await formatConfig(appConfig)

    // write the config to a "firebase-app-config.js"
    const filePath = path.resolve(process.cwd(), 'firebase-app-config.js');
    fs.writeFileSync(filePath, formattedConfig);
    console.log("Firebase app config generated successfully!");
}