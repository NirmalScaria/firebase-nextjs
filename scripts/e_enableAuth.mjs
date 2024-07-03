// This enable the authentication providers (email - password and google) for the firebase project

import { google } from "googleapis";
import { setupGoogleAuth } from "./d_setWebApp.mjs";
import readline from "readline";
const identitytoolkit = google.identitytoolkit('v2');
import open from "open";
import chalk from "chalk";

export async function enableAuth(selectedProject) {
    await setupGoogleAuth(google)
    await enableEmailPassword(selectedProject);
}

async function enableEmailPassword(selectedProject) {
    try {
        const resp = await identitytoolkit.projects.updateConfig({
            name: `projects/${selectedProject}/config`,
            updateMask: "signIn.email.enabled,signIn.email.passwordRequired",
            requestBody: {
                signIn: {
                    email: {
                        enabled: true,
                        passwordRequired: true
                    }
                }
            }
        })
    }
    catch (error) {
        console.log("Please enable Authentication (Click 'Get Started') from Firebase Console. (You don't have to do any setup there)")
        console.log(chalk.green("https://console.firebase.google.com/project/" + selectedProject + "/authentication"))
        open("https://console.firebase.google.com/project/" + selectedProject + "/authentication")
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        await new Promise(resolve => {
            rl.question("Press enter to continue ", resolve)
        })
        // Finally I get to use recursion for something useful.
        await enableEmailPassword(selectedProject)
    }
}
