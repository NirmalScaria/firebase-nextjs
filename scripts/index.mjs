#!/usr/bin/env node

import { setup } from "./setup.mjs";
import { getenv } from "./utils/getEnv.mjs";

import { Command } from "commander"

async function main() {
    console.log("🔥🔥🔥 Welcome to FirebaseNextJS 🔥🔥🔥")
    const program = new Command()
        .name("FirebaseNextJS")
        .description("FirebaseNextJS is a CLI tool to help you set up Firebase with Next.js")

    program.addCommand(setup).addCommand(getenv)

    program.parse()
}

main()