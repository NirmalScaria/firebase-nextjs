import path from 'path';
import fs from 'fs';

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

export async function copyComponents() {
    var isUsingSrc = false;

    // COPY THE COMPONENTS

    const cwd = process.cwd();
    var source = path.join(cwd, 'node_modules/firebase-nextjs/dist/components/firebase-nextjs');
    var target = path.join(cwd, '');

    // If @/src exists, copy to @/src/components
    const srcTarget = path.join(target, 'src');
    if (fs.existsSync(srcTarget)) {
        target = srcTarget;
        isUsingSrc = true;
    }

    var routerPath = path.join(cwd, '');
    if (fs.existsSync(path.join(routerPath, 'src'))) routerPath = path.join(routerPath, 'src');

    const appRouterPath = path.join(routerPath, 'app');
    const pagesRouterPath = path.join(routerPath, 'pages');

    if (fs.existsSync(appRouterPath)) {
        console.log("App router detected");
        const nextFireTarget = path.join(appRouterPath, '(authpages)');
        const nextFireSource = path.join(cwd, 'node_modules/firebase-nextjs/dist/authpages');
        if (!fs.existsSync(nextFireTarget)) fs.mkdirSync(nextFireTarget);
        copyFiles(nextFireSource, nextFireTarget);
        console.log("Files copied to app router");
    }
    else {
        console.error("Pages router not supported yet.")
        console.error("See progress here : https://github.com/NirmalScaria/firebase-nextjs/issues/3")
        throw new Error("Pages router not supported yet.");
    }

    // COPY THE MIDDLEWARE
    source = path.join(cwd, 'node_modules/firebase-nextjs/dist/middleware.js');
    if (isUsingSrc) {
        target = path.join(cwd, 'src/middleware.js');
    }
    else {
        target = path.join(cwd, 'middleware.js');
    }
    if (fs.existsSync(target)) {
        target = path.join(cwd, 'middleware-example.js');
    }

    fs.copyFileSync(source, target);
}