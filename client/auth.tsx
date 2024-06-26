"use client";
import React, { useContext, useState, useEffect } from "react";
import Firebase from "../nextfirejs-firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";

type NextFireJSContextType = {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  currentUser: User | null;
  firebase: Firebase | null;
};

const NextFireJSContext = React.createContext<NextFireJSContextType>({
  userLoggedIn: false,
  isEmailUser: false,
  currentUser: null,
  firebase: null,
} as NextFireJSContextType);

export function getUserCS() {
  return useContext(NextFireJSContext);
}

export function NextFireJSProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebase, setFirebase] = useState<Firebase | null>(new Firebase()); // [1
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setFirebase(new Firebase());
    const unsubscribe = onAuthStateChanged(getAuth(firebase!.app), initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: User | null) {
    if (user) {

      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      user.getIdToken(true).then(function (idToken) {
        document.cookie = `nextfirejs_token=${idToken}; expires=${new Date(Date.now() + 3600 * 1000 * 24 * 14).toUTCString()}; path=/;`;
      }).catch(function (error) {
        console.error("FAILED TO GET ID TOKEN")
      });

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      document.cookie = "nextfirejs_token=";
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser,
    firebase: new Firebase(),
  };

  return (
    <NextFireJSContext.Provider value={value}>
      {loading ? <body /> : children}
    </NextFireJSContext.Provider>
  );
}
