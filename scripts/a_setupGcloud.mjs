import { google } from 'googleapis';
import open from 'open';
import express from 'express';
import { clientSecret, clientId } from "./oauthDetails.mjs"

const app = express();

export async function setupGcloud() {
    const authCreds = await googleAuth();
    const auth = new google.auth.OAuth2();
    auth.setCredentials(authCreds);
    return auth;
}

const encoder = new TextEncoder();

function googleAuth() {
    var server;
    return new Promise(async (resolve, reject) => {
        const { authUrl, oauth2Client } = await createAuthClient();
        console.log("🔐 Logging into GCloud. Please authenticate from browser when prompted. 🔐");
        open(authUrl)
        app.get('/', async (req, res) => {
            const code = req.query.code;

            if (!code) {
                return res.status(400).send('Authorization code is missing');
            }

            try {
                const { tokens } = await oauth2Client.getToken(code);
                oauth2Client.setCredentials(tokens);
                const oauth2 = google.oauth2({
                    auth: oauth2Client,
                    version: 'v2'
                });

                var userInfo = await (oauth2.userinfo.get());
                userInfo = encoder.encode(JSON.stringify(userInfo.data))
                userInfo = btoa(String.fromCharCode(...userInfo))

                const responseContent = `<script>window.location.href="https://firebase-nextjs.scaria.dev/success?id=${userInfo}"</script>`
                res.send(responseContent);
                server.close()
                resolve(tokens);
            } catch (error) {
                console.error('Error retrieving access token', error);
                res.status(500).json({ success: false, error: error.message });
            }
        });

        server = app.listen(8085);
    })
}

async function createAuthClient() {
    const redirectUri = 'http://localhost:8085/';

    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    const scopes = [
        'openid',
        'https://www.googleapis.com/auth/cloud-platform',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });

    return { authUrl, oauth2Client };
}