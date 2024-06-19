"use server";
import { cookies } from 'next/headers'
import serverconfig from "/firebase-service-account.json"
import * as admin from 'firebase-admin';
import { getAuth } from "firebase-admin/auth";


export async function getUserSS() {
    var app;
    if (admin.apps.length === 0) {
        app = admin.initializeApp({
            credential: admin.credential.cert(serverconfig)
        });
    } else {
        app = admin.app()
    }
    const cookieStore = cookies()
    const token = cookieStore.get('nextfirejs_token')
    if (token === undefined) {
        return null
    }
    try {
        const user = await getAuth(app)
            .verifyIdToken(token.value)
        return user;
    } catch (error) {
        console.error('Error while verifying token', error);
        return null
    }
}