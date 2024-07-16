
![firebase-nextjs](https://github.com/NirmalScaria/nextfirejs/assets/46727865/48e2f4e1-318c-4877-97a8-df1c6e21604c)

**Effortless Firebase integration for NextJS**

Demo : [https://firebase-nextjs.scaria.dev](https://firebase-nextjs.scaria.dev)

![MacBook Air - 8](https://github.com/NirmalScaria/nextfirejs/assets/46727865/2ad45f6e-17f5-41d7-80cd-179aa22dc7c4)

# Setup Instructions

The setup will automatically take care of configurations and credentials. If you would instead prefer to do it all manually, [Click here](#manual-installation).

Prerequisite: A firebase project.

## 1. Install the package
```bash
npm install firebase-nextjs
```

## 2. Run the setup script
```bash
npx firebase-nextjs setup
```

This will
- Prompt you to log in with Google.
- You will be asked to select the firebase project you wish to use.
- You will be asked to choose the service account you wish to use. ("firebase-admin-sdk" is recommended)
- Choose an app you wish to use. (Must be a web app) (If an app doesn't exist, you can create it there.)
- This will generate the necessary authentication credentials, and store it to the project.
- With this, basic setup is complete.

## 3. Setup firebase-nextjs Provider

In the root layout file, (layout.jsx), wrap the whole body in **\<FirebaseNextJSProvider\>**

```html
import {FirebaseNextJSProvider} from "firebase-nextjs/client/auth";


<html lang="en">
    <FirebaseNextJSProvider>
        <body className={inter.className}>{children}</body>
    </FirebaseNextJSProvider>
</html>
```

## 4. Thats it! Run the project.

```bash
npm run dev
```

This will require you to sign in to continue. You can use Google Sign In or Email Password Sign In.

# Access the auth state

You can access the authentication state, and the user object on client side as well as server side easily. Learn more:
https://firebase-nextjs.scaria.dev/auth

# Customisation

firebase-nextjs offers complete customisation of login pages. To learn more, visit:
https://firebase-nextjs.scaria.dev/custom_login

# Components

firebase-nextjs comes with many pre built components to help with user authentication and user management. Learn more from:
https://firebase-nextjs.scaria.dev/components

# Routing

You can customise the rules for routing, and define which pages are public and which pages are for logged in users. Learn more at:
https://firebase-nextjs.scaria.dev/routing

# Moving to production

Before deploying the app to production, there are few configurations and security measures to be done. Read more at:
https://firebase-nextjs.scaria.dev/production

# For Developers

If you wish to contribute or make changes to the package, follow the below guide

## Step 1: Fork and clone the repo

Fork the repo to your profile and clone the repo locally.

## Step 2: Build the package

Run the command

```
npm run build
```

This will create a folder 'build' in the directory. It will contain the actual package that you should be using.

## Step 3: Link the package to your project

Create a nextjs project that you wish to test the package with. (Or use your existing NextJS project). Copy the location of the build directory generated from the previous step.

Run the command
```
npx link /path/to/build/folder/of/firebase-nextjs
```

## Step 4: Use the package

Now, the package is linked to your project, and it is exactly as if you have installed the package. **Do not add the package name to package.json.**

To use the package in your project,
You can import the files just like you would form an installed package.

Example:
```
import { ProfileButton } from "firebase-nextjs/client/components";
```

To use the npx script
You can run the npx script as usual, and the code in your build folder will be used.
```
npx firebase-nextjs getenev
```

## Step 5: Modifications

After you make any modification to the source code, run 
```
npm run build
```
Thats it and your project will be using the newly built package.

## NOTE: Installing other packages

Whenever you use the command `npm install packagename` to install any package, the npx link will be removed.
Re run the npx command to link to the build directory again.

## Contributing

If you have done any modification that might be useful to others, you are welcome to create a pull request and become a contributor.

















