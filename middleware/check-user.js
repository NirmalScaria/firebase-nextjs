import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { firebaseConfig } from "/firebase-app-config";

const google_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";
export default async function checkUser() {
    const cookieStore = cookies();
    const token = cookieStore.get("nextfirejs_token")?.value;
    if (!token) {
        return false;
    }
    var headers = jwtDecode(token, { header: true });
    var body = jwtDecode(token);
    const keys = await getGoogleKeys()
    if (!(keys.includes(headers.kid))) {
        console.warn("INVALID JSON : KID NOT MATCH")
        return false;
    }
    const current_time = Math.floor(Date.now() / 1000);
    if (body.exp < current_time) {
        console.warn("TOKEN EXPIRED")
        return false;
    }
    if (body.iat > current_time) {
        console.warn("TOKEN ISSUED IN FUTURE")
        return false;
    }
    const projectId = firebaseConfig.projectId;
    if (body.aud != projectId) {
        console.warn("INVALID AUDIENCE")
        return false;
    }
    if (body.iss != "https://securetoken.google.com/" + projectId) {
        console.warn("INVALID ISSUER")
        return false;
    }
    if (body.sub == undefined) {
        console.warn("INVALID SUBJECT")
        return false;
    }
    if (body.auth_time > current_time) {
        console.warn("INVALID AUTH TIME")
        return false;
    }
    return true

}

async function getGoogleKeys() {
    const res = await fetch(google_cert_url);
    const body = await res.json();
    return (Object.keys(body));
}