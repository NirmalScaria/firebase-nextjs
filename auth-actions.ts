import { auth } from "./nextfirejs-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
};

export async function doSignOut() {
  await auth.signOut();
  window.location.reload();
}

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser!, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser!, {
    url: `${window.location.origin}/home`,
  });
};
