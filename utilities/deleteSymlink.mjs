#!/usr/bin/env node

// This will delete the symlink from build/node_modules to node_modules

import fs from 'fs';
import path from 'path';

fs.unlinkSync(path.join(process.cwd(), 'build', 'node_modules'));

console.log("Symlink deleted")