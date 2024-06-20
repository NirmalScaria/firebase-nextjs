#!/usr/bin/env node

import { copyComponents } from "./a_copyComponents.mjs";
import { setupGcloud } from "./a_setupGcloud.mjs";
import { setupProject } from "./b_setupProject.mjs";
import { generateServiceAccount } from "./c_generateServiceAccount.mjs";
import { setWebApp } from "./d_setWebApp.mjs";
import { enableAuth } from "./e_enableAuth.mjs";

async function setup() {
    console.log("🤞🏻 Starting NextFireJS Setup. 🤞🏻")

    // Step 0 : Copy the files
    console.log("📦 Installing authentication components 📦")
    await copyComponents();
    console.log("👏 Components installed. 👏")

    // Step 1 : Install gcloud and login to it.
    
    console.log("🤖 Setting up GCloud 🤖")
    await setupGcloud();
    console.log("👏 GCloud setup complete. 👏")

    // Step 2 : Set firebase project
    console.log("👀 Checking available firebase projects 👀")
    const selectedProject = await setupProject();
    console.log(`🫰🏼 Project Setup Complete: ${selectedProject} 🫰🏼`)

    // Step 3 : Generate service account
    console.log("🤖 Setting up service account 🤖")
    await generateServiceAccount();
    console.log("👏 Service Account setup complete. 👏")

    // Step 4 : Set up firebase app
    console.log("🤓 Checking registered apps in the firebase project 🤓")
    await setWebApp(selectedProject);
    console.log("👏 Firebase App setup complete. 👏")

    console.log("🫃🏻 Almost there... Enabling authentication providers...")
    await enableAuth(selectedProject)

}

setup();