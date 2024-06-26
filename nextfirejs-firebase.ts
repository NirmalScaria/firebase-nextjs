import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//@ts-ignore
import { firebaseConfig } from "/firebase-app-config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export function getApp() {
    if (getApps().length === 0) {
        return initializeApp(firebaseConfig);
    }
    else {
        return getApps()[0];
    }
}

export { app, auth };