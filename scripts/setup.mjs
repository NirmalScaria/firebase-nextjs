#!/usr/bin/env node

import { copyComponents } from "./a_copyComponents.mjs";
import { setupGcloud } from "./a_setupGcloud.mjs";
import { setupProject } from "./b_setupProject.mjs";
import { generateServiceAccount } from "./c_generateServiceAccount.mjs";
import { setWebApp } from "./d_setWebApp.mjs";
import { enableAuth } from "./e_enableAuth.mjs";
import { showStepsStatus } from "./cliUtils.mjs";
import { Command } from "commander";

export const setup = new Command("setup")
    .description("Setup NextFireJS")
    .action(setupAction);


async function setupAction() {
    console.log("🤞🏻 Starting NextFireJS Setup. 🤞🏻")

    // Step 0 : Copy the files
    showStepsStatus(0)
    console.log("📦 Installing authentication components 📦")
    // await copyComponents();
    console.log("👏 Components installed. 👏")

    // Step 1 : Install gcloud and login to it.
    showStepsStatus(1)
    console.log("🤖 Setting up GCloud 🤖")
    const auth = await setupGcloud();
    console.log("👏 GCloud setup complete. 👏")

    // Step 2 : Set firebase project
    showStepsStatus(2)
    console.log("👀 Checking available firebase projects 👀")
    const selectedProject = await setupProject(auth);
    console.log(`🫰🏼 Project Setup Complete: ${selectedProject} 🫰🏼`)

    // Step 3 : Generate service account
    showStepsStatus(3)
    console.log("🤖 Setting up service account 🤖")
    await generateServiceAccount();
    console.log("👏 Service Account setup complete. 👏")

    // Step 4 : Set up firebase app
    showStepsStatus(4)
    console.log("🤓 Checking registered apps in the firebase project 🤓")
    await setWebApp(selectedProject);
    console.log("👏 Firebase App setup complete. 👏")

    console.log("🫃🏻 Almost there... Enabling authentication providers...")
    showStepsStatus(5)
    await enableAuth(selectedProject)
    showStepsStatus(6)
    console.log("Email-password authentication enabled. If you want to enable Google Authentication, please visit and click add provider:")
    console.log("https://console.firebase.google.com/u/0/project/" + selectedProject + "/authentication/providers")
    console.log("🎉🎉🎉 Setup Complete 🎉🎉🎉")
}

setupAction();