#!/usr/bin/env node
import { copyAllFiles } from "./copyFiles.mjs";
import { generateSA } from "./generateSA.mjs";
// import { generateWebApp } from "./generateWebApp.mjs";

async function postInstall() {
    // await copyAllFiles();
    const { selectedProject } = await generateSA();
    // await generateWebApp(selectedProject);
}

postInstall();