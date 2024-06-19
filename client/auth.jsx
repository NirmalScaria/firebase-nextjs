"use client";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../nextfire-firebase";
import { onAuthStateChanged } from "firebase/auth";

const NextFireContext = React.createContext();

export function getUserCS() {
  return useContext(NextFireContext);
}

export function NextFireProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {

      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      user.getIdToken(true).then(function (idToken) {
        document.cookie = `nextfire_token=${idToken}`;
        // wait for 1 second
      }).catch(function (error) {
        console.error("FAILED TO GET ID TOKEN")
      });

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      document.cookie = "nextfire_token=";
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    currentUser,
    setCurrentUser
  };

  return (
    <NextFireContext.Provider value={value}>
      {loading ? <body /> : children}
    </NextFireContext.Provider>
  );
}
