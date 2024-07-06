#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { Command } from "commander";

export const getenv = new Command("getenv")
    .description("Get the environment variables for the service account credentials")
    .action(getenvAction);

async function getenvAction() {
    const serviceAccountCreds = await getServiceAccountCreds();
    const credString = serviceAccountCreds;
    console.log("Here are the environment variables. Please copy these and paste them in your environment.")
    console.log("Make sure to either delete or gitignore the firebase-service-account.json file before commiting to version control.\n\n")
    console.log(credString)
    console.log("\n\n")
}

async function getServiceAccountCreds() {
    const SERVICE_ACCOUNT_CREDS_LOCATION = path.join(process.cwd(), "firebase-service-account.json");
    const key = JSON.stringify(JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_CREDS_LOCATION, 'utf8')));
    return `FIREBASENEXTJS_SERVICE_ACCOUNT_CREDENTIALS='${key}'`
}