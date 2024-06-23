#!/usr/bin/env node

// This will take the package.json file from build/package.json, and edit
// the file to remove the "private" field
// This is necessary for publishing the package to npm.

import fs from 'fs';
import path from 'path';

const packagePath = path.resolve('build/package.json');
const packageInfo = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

delete packageInfo.private;

fs.writeFileSync(packagePath, JSON.stringify(packageInfo, null, 2));
