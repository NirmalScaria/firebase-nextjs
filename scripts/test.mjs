import { google } from "googleapis"
const firebase = google.firebase('v1beta1');
const identitytoolkit = google.identitytoolkit('v2');
const auth = new google.auth.GoogleAuth({
    scopes: [
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/firebase',
    ],
    keyFilename: 'firebase-service-account.json'
})
const authClient = await auth.getClient();
google.options({ auth: authClient });



export async function getProjectsFB() {

    const res = await firebase.projects.list();
    console.log(res.data.results)
    return res.data.results;
}

export async function getAppsFB(selectedProject) {
    var apps = await firebase.projects.webApps.list({
        parent: `projects/${selectedProject}`
    })
    return apps.data.apps;
}

export async function getAppConfig(selectedProject, appId) {
    var res = await firebase.projects.webApps.getConfig({
        name: `projects/${selectedProject}/webApps/${appId}/config`
    })
    console.log(res.data)
    return res.data
}
// getProjectsFB();

getAppConfig("nextfire-test-29ebd", "1:279146484075:web:5ae2cfb8a5afb875bbbc2e");

// getApps("nextfire-test-29ebd");