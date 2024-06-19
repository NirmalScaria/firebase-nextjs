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
const source = path.join(cwd, 'dist/components/nextfirejs');
var target = path.join(cwd, '../../');

// If @/src exists, copy to @/src/components
const srcTarget = path.join(target, 'src');
if (fs.existsSync(srcTarget)) target = srcTarget;

target = path.join(target, 'components');
if (!fs.existsSync(target)) fs.mkdirSync(target);

target = path.join(target, 'nextfirejs');
if (!fs.existsSync(target)) fs.mkdirSync(target);

copyFiles(source, target);

var appRouterPath = path.join(cwd, '../../');
if (fs.existsSync(path.join(appRouterPath, 'src'))) appRouterPath = path.join(appRouterPath, 'src');

appRouterPath = path.join(appRouterPath, 'app');
if (fs.existsSync(appRouterPath)) {
    console.log("App router detected");
    const nextFireTarget = path.join(appRouterPath, 'nextfirejs');
    const nextFireSource = path.join(cwd, 'dist/nextfirejs');
    if (!fs.existsSync(nextFireTarget)) fs.mkdirSync(nextFireTarget);
    copyFiles(nextFireSource, nextFireTarget);
    console.log("Files copied to app router");
}
else {
    console.log("App router not detected");
    console.log("Quitting")
}