const path = require('path');
const fs = require('fs');

const copyFiles = (source, target) => {
    const files = fs.readdirSync(source);
    files.forEach(file => {
        const filePath = path.join(source, file);
        const targetPath = path.join(target, file);
        if (fs.lstatSync(filePath).isDirectory()) {
        fs.mkdirSync(targetPath);
        copyFiles(filePath, targetPath);
        } else {
        fs.copyFileSync(filePath, targetPath);
        }
    });
    }

const cwd = process.cwd();
const source = path.join(cwd, 'node_modules/nextfirejs/dist/components');
const target = path.join(cwd, 'components');

copyFiles(source, target);

