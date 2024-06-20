#!/usr/bin/env node

import { setupGcloud } from "./a_setupGcloud.mjs";
import { setupProject } from "./b_setupProject.mjs";
import { generateServiceAccount } from "./c_generateServiceAccount.mjs";

async function setup() {
    // Step 1 : Install gcloud and login to it.
    console.log("🤞🏻 Starting NextFireJS Setup. 🤞🏻")
    await setupGcloud();
    console.log("👏 GCloud setup complete. 👏")

    // Step 2 : Set firebase project
    console.log("👀 Checking available firebase projects 👀")
    const selectedProject = await setupProject();
    console.log(`🫰🏼 Project Setup Complete: ${selectedProject} 🫰🏼`)

    console.log("🤖 Setting up service account 🤖")
    await generateServiceAccount();
    console.log("👏 Service Account setup complete. 👏")


}

setup();