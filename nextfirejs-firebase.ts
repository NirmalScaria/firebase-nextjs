import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//@ts-ignore
import { firebaseConfig } from "/firebase-app-config";

class Firebase {
    app: FirebaseApp;
    constructor() {
        console.log("Inititeedd")
        const app = initializeApp(firebaseConfig);
        this.app = app;
    }
}

export default Firebase;