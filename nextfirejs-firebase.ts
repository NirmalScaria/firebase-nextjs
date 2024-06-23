import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//@ts-ignore
import { firebaseConfig } from "/firebase-app-config";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };