
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

# Customisation

## Changing the UI

**Every authentication page is editable** and is **placed under **app/(authpages)**. You can edit any of them and make use of the client components to connect with authentication functionalities. (Written below)

## Client components

There is a set of components that could be imported from "firebase-nextjs/client/components".
1. **LogOutButton:** Takes children (typically a button) and when clicked, the user will be logged out.
```javascript
import {LogOutButton} from "firebase-nextjs/client/components";

export default function MyLogOutButton() {
    return <LogOutButton>
        <button className = "bg-red-800 text-white">Log Out</button>
    </LogOutButton>
}
```

2. **GoogleSignInButton:** Triggers Google Sign In Popup. This could be used for Login as well as Sign Up.
```javascript
import {GoogleSignInButton} from "firebase-nextjs/client/components";

export default function MyLogOutButton() {
    return <GoogleSignInButton>
        <button className = "bg-red-800 text-white">Sign in with Google</button>
    </GoogleSignInButton>
}
```

3. **EmailSignInButton:** Triggers sign in with provided email and password. Takes hooks for showing state in the UI.
```javascript
import {EmailSignInButton} from "firebase-nextjs/client/components";

export default function MyLogOutButton() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(e) {
        if (e.target.type === "email") setEmail(e.target.value);
        if (e.target.type === "password") setPassword(e.target.value);
        setErrorMessage("")
    }

    // Add text buttons with email and password. Set a handlechange function to set the values.

    return <div className="flex flex-col">
                <input type="email" onChange={handleChange}/>
                <input type="password" onChange={handleChange}/>
                <EmailSignInButton email={email} password={password} setErrorMessage={setErrorMessage} setLoading={setLoading}>
                    <button disabled={loading}>
                        Sign In
                    </button>
                </EmailSignInButton>
                <span className="text-red-600 text-sm">
                    {errorMessage}
                </span>
    </div>
}
```
### Routing and authentication
Authentication can be routed based on few rules and conditions. Everything happens within middleware.js

firebaseNextJSMiddlewareOptions parameter passed to FirebaseNextJSMiddleware has the following optional properties

1. **allowRule** : This takes in a regex and allows the matching routes to the public. Every other route will require authentication to use.
2. **gateMode** : This could either be "allowByDefault" or "denyByDefault".
3. **privatePaths** : Takes in an array of paths. Applicable only if the gateMode is set to allowByDefault. Every path in this will be public and every other path will need authentication.
4. **publicPaths** : Takes in an array of paths. Applicable only if the gateMode is set to denyByDefault. Every path in this will require authentication and every other path will be public.
5. **middleware** : This is a custom middleware that could be passed to FirebaseNextJSMiddleware. Requests which are allowed/permitted by FirebaseNextJSMiddleware will be sent to the provided middleware.

**NOTE: allowRules parameter takes presedence over the other parameters. Meaning, if it is specified, all other parameters will be ignored.**
**NOTE: Make sure to allow _next/\* for almost all circumstances, as _next is mostly used for public purposes**

# Accessing the auth state

## Client side

On client side, the auth state could be accessed from any page/component using the function getUserCS(); (Stands for "Get User (Client Side)")
```javascript
"use client";
import { getUserCS } from "firebase-nextjs/client/auth";
export default function ClientPage() {
    const { currentUser } = getUserCS();
    return <div>
      {JSON.stringify(currentUser?.email}
    </div>
}
```

## Server side

On server side, the auth state could be accessed from any server side page or any API or function call! Yes! Out of the box. Just use the function getUserSS();. (Stands for "Get User (Server Side)"

```javascript
"use server";
import { getUserSS } from "firebase-nextjs/server/auth";
export default async function ServerPage() {
  const user = await getUserSS();
  return <div>
    {JSON.stringify(user?.email}
  </div>
}
```

# Production setup

There are few steps to be taken care of before publishing to production
## 1. Service Account Keys
The service account keys are stored in the root of project as "firebase-service-account.json". However, this is highly sensitive and should not be pushed to version control.

To configure the service account, follow these steps.

1. Run "npx firebase-nextjs getenv" to get the environment variables. This will print the environment variable to terminal.
2. Copy the environment variable and set it wherever you plan to deploy. Like vercel or ".env.local" for local testing.
3. Delete the "firebase-service-account.json" or add "firebase-service-account.json" to .gitignore.
4. NOTE: There is another file, "firebase-app-config.js" which looks like a set of credentials, but it is totally fine to be pushed and published. [Read more](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public)

## 2. Add domain to firebase.
When you are pushing to production, you will be having a production url different from localhost or the firebase url. This production url should be added to authorized domains in firebase authentication.

1. Go to firebase console.
2. Go to authentication -> settings -> authorized domains
3. Add the domain you plan to publish the website to.

# Manual Installation 

## 1. Install the package
```bash
npm install firebase-nextjs
```

## 2. Firebase Service Account

Generate a Firebase Serivce Account Private Key and download it as JSON. You can get it from https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk

Rename it to 
```
"firebase-service-account.json"
```
and store it to the root of your NextJS project. (Along with package.json)

## 3. Enable authentication methods

Go to Firebase Authentication (https://console.firebase.google.com/u/0/project/_/authentication) and enable it. Also enable the providers you would like to use. (Google sign in and Email Password sign in are recommended)

## 4. Firebase Web App

Register a Web App app from firebase console. Read more at https://firebase.google.com/docs/web/setup#register-app if you need guidance. 

Once completed, you can scroll down to see a section of code which looks like this:
```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

Copy the content and store it to root of your NextJS project as "firebase-app-config.js". (Along with package.json)

## 5. IMPORTANT: Add export keyword

In the above file added, insert an "export" keyword just before **const firebaseConfig = {...**
```javascript
export const firebaseConfig = {
    apiKey: "...",
    authDomain: "..."
    ...
}
```

## 6. Add login pages
Add the login pages to the appropriate locations. It should handle route of /login, /register, and /forgot-password

Please refer to the source code for sample.

## 7. Last step

In the root layout file, (layout.jsx), wrap the whole body in **\<FirebaseNextJSProvider\>**

```html
import {FirebaseNextJSProvider} from "firebase-nextjs/client/auth";

<html lang="en">
    <FirebaseNextJSProvider>
        <body className={inter.className}>{children}</body>
    </FirebaseNextJSProvider>
</html>
```

## Thats it!

Now try running the code and you will have to authenticate before you can access the website.

    
