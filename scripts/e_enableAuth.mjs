// This enable the authentication providers (email - password and google) for the firebase project

import { google } from "googleapis";
import { setupGoogleAuth } from "./d_setWebApp.mjs";
const firebase = google.firebase('v1beta1');
const identitytoolkit = google.identitytoolkit('v2');

export async function enableAuth(selectedProject) {
    await setupGoogleAuth(google)
    await enableEmailPassword(selectedProject);
    await enableGoogleAuth(selectedProject)
}

async function enableEmailPassword(selectedProject) {
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

async function enableGoogleAuth(selectedProject) {
    const url = "https://console.firebase.google.com/u/0/project/" + selectedProject + "/authentication/providers";
    console.log("Please enable Google authentication in the Firebase console: " + url);
    console.log("That will be the end :)")
    console.log("BYE")
}

