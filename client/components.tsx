"use client";
import "./componentStyles.css";
import { doSignOut } from "nextfirejs/auth-actions"
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "nextfirejs/nextfirejs-firebase";
import { getUserCS } from "nextfirejs/client/auth";
import { decodeFirebaseError } from "nextfirejs/client/getFirebaseErrors";
import React from "react";
export function LogoutButton({ children }: {children: React.ReactNode}) {
    return <div onClick={doSignOut}>{children}</div>
}

export function GoogleSignInButton({ children, className }: { children: React.ReactNode, className?: string }) {
    const doSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const resp = await signInWithPopup(auth, provider);
        if (resp) {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    return <div onClick={doSignInWithGoogle} className={className}>{children}</div>
}

export function EmailSignInButton({ children, email, password, setErrorMessage, className, setLoading } : {
    children: React.ReactNode,
    email: string,
    password: string,
    setErrorMessage: (msg: string) => any,
    className?: string,
    setLoading?: (loading: boolean) => any
}) {
    async function doSignInWithEmailAndPassword() {
        if (setLoading) setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            if (setLoading) setLoading(false)
        }
        catch (error: any) {
            setErrorMessage(decodeFirebaseError({ errorCode: error.code }))
            if (setLoading) setLoading(false)
        }
    }
    return <div onClick={doSignInWithEmailAndPassword} className={className}>{children}</div>
}

export function EmailSignUpButton({ children, email, password, setErrorMessage, className, setLoading }: {
    children: React.ReactNode,
    email: string,
    password: string,
    setErrorMessage: (msg: string) => void,
    className?: string,
    setLoading?: (loading: boolean) => void

}) {
    async function doCreateUserWithEmailAndPassword() {
        if (setLoading) setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            if (userCredential) {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            if (setLoading) setLoading(false)
        }
        catch (error: any) {
            setErrorMessage(decodeFirebaseError({ errorCode: error.code }))
            if (setLoading) setLoading(false)
        }
    }
    return <div onClick={doCreateUserWithEmailAndPassword} className={className}>{children}</div>
}

export function ProfileButton({ size = 30 }) {
    const { currentUser } = getUserCS();
    const imageUrl = currentUser?.photoURL ?? "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + (currentUser?.displayName ?? currentUser?.email);
    if (!currentUser) return null;
    function openProfilePopup() {
        const popup = document.getElementById("profilePopup")!;
        const profileImage = document.getElementById("profileImage");
        popup.style.display = popup.style.display === "flex" ? "none" : "flex";
        popup.style.opacity = popup.style.opacity === "1" ? "0" : "1";
        const profileButton = document.getElementById("profileButton")!;
        profileButton.style.backgroundColor = profileButton.style.backgroundColor === "rgba(0, 0, 0, 0.1)" ? "transparent" : "rgba(0, 0, 0, 0.1)";
        window.onclick = function (event) {
            if (event.target !== popup && event.target !== profileButton && event.target !== profileImage) {
                popup.style.display = "none";
                popup.style.opacity = "0";
                profileButton.style.backgroundColor = "transparent";
            }
        }
    }
    return <>
        <div className="profilePopup" id="profilePopup">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <img src={imageUrl} alt="profile" height={size} width={size} className="profilePopupImage" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {currentUser?.displayName && <div className="profileName">{currentUser?.displayName}</div>}
                    <div className="profileEmail">{currentUser?.email}</div>
                </div>
            </div>
            <hr />
            <LogoutButton> <div className="profileLogout">
                <LogoutLogo />
                Log Out</div> </LogoutButton>
        </div>
        <div className="profileButton" onClick={openProfilePopup} id="profileButton">
            <img src={imageUrl} alt="profile" height={size} width={size} className="rounded-full" id="profileImage" />
        </div>
    </>
}

function LogoutLogo({ height = 20, width = 20, ...props }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} id="logout"><g><path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zm13.82 5.42-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z"></path></g></svg>
}