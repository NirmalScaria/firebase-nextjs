"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeFirebaseError = void 0;
function decodeFirebaseError(_a) {
    var errorCode = _a.errorCode;
    if (errorCode == "auth/invalid-email")
        return "Invalid Email Address";
    if (errorCode == "auth/user-disabled")
        return "User Account Disabled";
    if (errorCode == "auth/user-not-found")
        return "User Account Not Found";
    if (errorCode == "auth/wrong-password")
        return "Incorrect Password";
    if (errorCode == "auth/missing-password")
        return "Please Enter a Password";
    if (errorCode == "auth/email-already-in-use")
        return "Email already in use. Please login with Google";
    if (errorCode == "auth/weak-password")
        return "Weak Password";
    if (errorCode == "auth/operation-not-allowed")
        return "Operation Not Allowed";
    if (errorCode == "auth/credential-already-in-use")
        return "Credential Already in Use";
    if (errorCode == "auth/account-exists-with-different-credential")
        return "Account Exists with Different Credential";
    if (errorCode == "auth/invalid-credential")
        return "Invalid Credential";
    if (errorCode == "auth/invalid-verification-code")
        return "Invalid Verification Code";
    return "Unable to login. Please try again.";
}
exports.decodeFirebaseError = decodeFirebaseError;
