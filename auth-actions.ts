import Firebase from "./nextfirejs-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(getAuth(new Firebase().app), email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(new Firebase().app), email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(getAuth(new Firebase().app), provider);
  return result;
};

export async function doSignOut() {
  await getAuth(new Firebase().app).signOut();
  window.location.reload();
}

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(getAuth(new Firebase().app), email);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(getAuth(new Firebase().app).currentUser!, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(getAuth(new Firebase().app).currentUser!, {
    url: `${window.location.origin}/home`,
  });
};
