"use client";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../nextfirejs-firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth";
import { getToken } from "../server/getToken";

type NextFireJSContextType = {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  currentUser: User | null;
};

const NextFireJSContext = React.createContext<NextFireJSContextType>({
  userLoggedIn: false,
  isEmailUser: false,
  currentUser: null,
} as NextFireJSContextType);

export function getUserCS() {
  return useContext(NextFireJSContext);
}

export function NextFireJSProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: User | null) {
    if (user) {

      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      user.getIdToken(true).then(async function (idToken) {
        const sessionToken = await getToken({ idToken });
        document.cookie = `nextfirejs_token=${sessionToken}; expires=${new Date(Date.now() + 3600 * 1000 * 24 * 14).toUTCString()}; path=/;`;
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
    currentUser
  };

  return (
    <NextFireJSContext.Provider value={value}>
      {loading ? <body /> : children}
    </NextFireJSContext.Provider>
  );
}
