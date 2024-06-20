import { copyAllFiles } from "./copyFiles.mjs";
import { generateSA } from "./generateSA.mjs";

async function postInstall() {
    console.log("Copying files")
    await copyAllFiles();
    console.log("Copy files completed")
    console.log("Generating service account.")
    await generateSA();
}

postInstall();