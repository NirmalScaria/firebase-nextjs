
# NextFireJS
![nextfirejslogo](https://github.com/NirmalScaria/nextfirejs/assets/46727865/980b3a80-d5a0-48c3-918a-2c0915ec7fbb)

**Effortless Firebase integration for NextJS**

[Skip to Installation Instructions](#setup-instructions)

# Features
NextFireJS currently offers the following features

## Pre-built customisable authentication pages
![nextfirejs-customisable-ui](https://github.com/NirmalScaria/nextfirejs/assets/46727865/f62d99c4-9117-4e31-a8b1-e837184aaff4)

## Setup in Under 5 minutes
![nextfirejs-setup](https://github.com/NirmalScaria/nextfirejs/assets/46727865/926500ae-009e-4bbd-9401-0ca590313518)

## Secure routing. Out of the box and customisable.
![nextfirejs-secure-routing](https://github.com/NirmalScaria/nextfirejs/assets/46727865/f7414c19-6a87-4519-b8d7-7b492277539a)

## Full support for Client Client & Server Side authentication
![nextfirejs-client-server](https://github.com/NirmalScaria/nextfirejs/assets/46727865/fcf63b26-7d5e-4996-9303-ffff0ac4db50)

## Pre-built UI components
![nextfirejs-ui-components](https://github.com/NirmalScaria/nextfirejs/assets/46727865/b3126fd5-dfb4-47c4-b166-537df4812445)

## Type safe and Open source
![nextfirejs-type-safe](https://github.com/NirmalScaria/nextfirejs/assets/46727865/d0bf72db-4833-4071-bee1-8ff0065fd171)

# Setup Instructions

The setup will automatically take care of configurations and credentials. If you would instead prefer to do it all manually, [Click here](#manual-installation).

Prerequisite: A firebase project.

## 1. Install the package
```bash
npm install nextfirejs
```

## 2. Run the setup script
```bash
npx nextfirejs setup
```

This will
- Automatically install gcloud if not installed. (You will be prompted to install it.)
- You will be prompted to login to gcloud.
- You will be asked to select the firebase project you wish to use.
- You will be asked to choose the service account you wish to use. ("firebase-admin-sdk" is recommended)
- Choose an app you wish to use. (Must be a web app) (If an app doesn't exist, you can create it there.)
- This will generate the necessary authentication credentials, and store it to the project.
- With this, basic setup is complete. Email password authentication will work, and if you want Google authentication, you will be given a link to add Google as provider, which you can visit and click "Add Provider" -> Google -> Enable.

## 3. Setup NextFireJS Provider

In the root layout file, (layout.jsx), wrap the whole body in **\<NextFireJSProvider\>**

```html
import {NextFireJSProvider} from "nextfirejs/client/auth";


<html lang="en">
    <NextFireJSProvider>
        <body className={inter.className}>{children}</body>
    </NextFireJSProvider>
</html>
```

## 4. Thats it! Run the project.

```bash
npm run dev
```

This will require you to sign in to continue. You can use Google Sign In or Email Password Sign In.

# Customisation

## Changing the UI

**Every authentication page is editable** and is **placed under components/nextfirejs/**. You can edit any of them and make use of the client components to connect with authentication functionalities. (Written below)

## Client components

There is a set of components that could be imported from "nextfirejs/client/components".
1. **LogOutButton:** Takes children (typically a button) and when clicked, the user will be logged out.
```javascript
import {LogOutButton} from "nextfirejs/client/components";

export default function MyLogOutButton() {
    return <LogOutButton>
        <button className = "bg-red-800 text-white">Log Out</button>
    </LogOutButton>
}
```

2. **GoogleSignInButton:** Triggers Google Sign In Popup. This could be used for Login as well as Sign Up.
```javascript
import {GoogleSignInButton} from "nextfirejs/client/components";

export default function MyLogOutButton() {
    return <GoogleSignInButton>
        <button className = "bg-red-800 text-white">Sign in with Google</button>
    </GoogleSignInButton>
}
```

3. **EmailSignInButton:** Triggers sign in with provided email and password. Takes hooks for showing state in the UI.
```javascript
import {EmailSignInButton} from "nextfirejs/client/components";

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

nextFireJSMiddlewareOptions parameter passed to NextFireJSMiddleware has the following optional properties

1. **allowRule** : This takes in a regex and allows the matching routes to the public. Every other route will require authentication to use.
2. **gateMode** : This could either be "allowByDefault" or "denyByDefault".
3. **privatePaths** : Takes in an array of paths. Applicable only if the gateMode is set to allowByDefault. Every path in this will be public and every other path will need authentication.
4. **publicPaths** : Takes in an array of paths. Applicable only if the gateMode is set to denyByDefault. Every path in this will require authentication and every other path will be public.
5. **middleware** : This is a custom middleware that could be passed to NextFireJSMiddleware. Requests which are allowed/permitted by NextFireJSMiddleware will be sent to the provided middleware.

**NOTE: allowRules parameter takes presedence over the other parameters. Meaning, if it is specified, all other parameters will be ignored.**
**NOTE: Make sure to allow _next/\* for almost all circumstances, as _next is mostly used for public purposes**

# Accessing the auth state

## Client side

On client side, the auth state could be accessed from any page/component using the function getUserCS(); (Stands for "Get User (Client Side)")
```javascript
"use client";
import { getUserCS } from "nextfirejs/client/auth";
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
import { getUserSS } from "nextfirejs/server/auth";
export default async function ServerPage() {
  const user = await getUserSS();
  return <div>
    {JSON.stringify(user?.email}
  </div>
}
```

# Manual Installation 

## 1. Install the package
```bash
npm install nextfirejs
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
Add the login pages to the appropriate locations. It should do the following:
The route "/nextfirejs" should point lead to this:

```javascript
import ForgotPasswordPage from "./ForgotPasswordPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
export default async function AuthPages({ searchParams }) {
    const path = searchParams.path;
    return <main className="w-screen h-screen bg-white text-black">
        {path == "/login" && <LoginPage />}
        {path == "/register" && <RegisterPage />}
        {path == "/forgot-password" && <ForgotPasswordPage />}
    </main>
}
```
Where the LoginPage, RegisterPage and ForgotPasswordpage should be created as components and places in the project manually.
You can refer to the source code of this project for sample.

## 7. Last step

In the root layout file, (layout.jsx), wrap the whole body in **\<NextFireJSProvider\>**

```html
import {NextFireJSProvider} from "nextfirejs/client/auth";

<html lang="en">
    <NextFireJSProvider>
        <body className={inter.className}>{children}</body>
    </NextFireJSProvider>
</html>
```

## Thats it!

Now try running the code and you will have to authenticate before you can access the website.

    
