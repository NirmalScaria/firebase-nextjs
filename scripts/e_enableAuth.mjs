// This enable the authentication providers (email - password and google) for the firebase project

import { google } from "googleapis";
import { setupGoogleAuth } from "./d_setWebApp.mjs";
const firebase = google.firebase('v1beta1');
const identitytoolkit = google.identitytoolkit('v2');

export async function enableAuth(selectedProject) {
    await setupGoogleAuth(google)
    await enableEmailPassword(selectedProject);
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


