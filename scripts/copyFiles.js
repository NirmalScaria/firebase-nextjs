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
const source = path.join(cwd, 'dist/components');
console.log("source is ", source);
const target = path.join(cwd, '../../components');
console.log("target is ", target);


copyFiles(source, target);

