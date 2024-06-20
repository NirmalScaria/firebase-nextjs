import { copyAllFiles } from "./copyFiles.mjs";
import { generateSA } from "./generateSA.mjs";

async function postInstall() {
    await copyAllFiles();
    await generateSA();
}

postInstall();