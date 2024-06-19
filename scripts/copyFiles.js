const path = require('path');
const fs = require('fs');

const copyFiles = (source, target) => {
    const files = fs.readdirSync(source);
    files.forEach(file => {
        const filePath = path.join(source, file);
        const targetPath = path.join(target, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath);
            copyFiles(filePath, targetPath);
        } else {
            fs.copyFileSync(filePath, targetPath);
        }
    });
}

const cwd = process.cwd();
console.log("cwd is ", cwd);
const source = path.join(cwd, 'dist/components/nextfirejs');
const targetRoot = path.join(cwd, '../../');

// If @/src exists, copy to @/src/components
const srcTarget = path.join(targetRoot, 'src');
if (fs.existsSync(srcTarget)) targetRoot = srcTarget;

const targetComponents = path.join(targetRoot, 'components');
if(!fs.existsSync(target)) fs.mkdirSync(target);

const target = path.join(targetComponents, 'nextfirejs');
if(!fs.existsSync(target)) fs.mkdirSync(target);

console.log("source is ", source);
console.log("target is ", target);

copyFiles(source, target);

