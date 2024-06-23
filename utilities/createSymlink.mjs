#!/usr/bin/env node

// This will create a symlink from build/node_modules to node_modules

import fs from 'fs';
import path from 'path';

fs.symlinkSync(path.join(process.cwd(), 'node_modules'), path.join(process.cwd(), 'build', 'node_modules'), 'dir');