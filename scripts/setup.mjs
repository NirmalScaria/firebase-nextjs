#!/usr/bin/env node
import { copyAllFiles } from "./copyFiles.mjs";
import { generateSA } from "./generateSA.mjs";
import { generateWebApp } from "./generateWebApp.mjs";

async function postInstall() {
    // await copyAllFiles();
    // const { selectedProject } = await generateSA();
    const selectedProject = "nextfire-test-29ebd"
    await generateWebApp(selectedProject);
}

postInstall();