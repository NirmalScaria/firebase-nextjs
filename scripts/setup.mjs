#!/usr/bin/env node

import { copyComponents } from "./a_copyComponents.mjs";
import { setupGcloud } from "./a_setupGcloud.mjs";
import { setupProject } from "./b_setupProject.mjs";
import { generateServiceAccount } from "./c_generateServiceAccount.mjs";
import { setWebApp } from "./d_setWebApp.mjs";
import { enableAuth } from "./e_enableAuth.mjs";
import { showStepsStatus } from "./cliUtils.mjs";

var steps = [
    {
        description: "Install authentication components",
        status: 0,
        function: copyComponents
    },
    {
        description: "Setup GCloud",
        status: 0,
        function: setupGcloud
    },
    {
        description: "Setup Firebase Project",
        status: 0,
        function: setupProject
    },
    {
        description: "Generate Service Account",
        status: 0,
        function: generateServiceAccount
    },
    {
        description: "Set Web App",
        status: 0,
        function: setWebApp
    },
    {
        description: "Enable Auth",
        status: 0,
        function: enableAuth
    }
]

async function setup() {
    console.log("🤞🏻 Starting NextFireJS Setup. 🤞🏻")

    // Step 0 : Copy the files
    showStepsStatus(0, steps)
    console.log("📦 Installing authentication components 📦")
    // await copyComponents();
    console.log("👏 Components installed. 👏")

    // Step 1 : Install gcloud and login to it.
    showStepsStatus(1, steps)
    console.log("🤖 Setting up GCloud 🤖")
    await setupGcloud();
    console.log("👏 GCloud setup complete. 👏")

    // Step 2 : Set firebase project
    showStepsStatus(2, steps)
    console.log("👀 Checking available firebase projects 👀")
    const selectedProject = await setupProject();
    console.log(`🫰🏼 Project Setup Complete: ${selectedProject} 🫰🏼`)

    // Step 3 : Generate service account
    showStepsStatus(3, steps)
    console.log("🤖 Setting up service account 🤖")
    await generateServiceAccount();
    console.log("👏 Service Account setup complete. 👏")

    // Step 4 : Set up firebase app
    showStepsStatus(4, steps)
    console.log("🤓 Checking registered apps in the firebase project 🤓")
    await setWebApp(selectedProject);
    console.log("👏 Firebase App setup complete. 👏")

    console.log("🫃🏻 Almost there... Enabling authentication providers...")
    showStepsStatus(5, steps)
    await enableAuth(selectedProject)
    showStepsStatus(6, steps)
    console.log("Email-password authentication enabled. If you want to enable Google Authentication, please visit and click add provider:")
    console.log("https://console.firebase.google.com/u/0/project/" + selectedProject + "/authentication/providers")
    console.log("🎉🎉🎉 Setup Complete 🎉🎉🎉")
}

setup();