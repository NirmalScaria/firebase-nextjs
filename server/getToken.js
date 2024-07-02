"use server"
import { getAuth } from "firebase-admin/auth";
import { getAppSS } from "./auth"

/**
 * Takes a temporary token from firebase getIdToken and returns
 * a token that can be used to authenticate with the server.
 */
export async function getToken({ idToken }) {
    const app = await getAppSS();
    // Token expires in 14 days
    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    const sessionCookie = getAuth().createSessionCookie(idToken, { expiresIn });
    return sessionCookie;
}