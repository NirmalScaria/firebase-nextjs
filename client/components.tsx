"use client";
import "./ProfileButtonStyle.css";
import { doSignOut } from "../auth-actions";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../nextfirejs-firebase";
import { getUserCS } from "./auth";
import { decodeFirebaseError } from "./getFirebaseErrors";
import React, { useState } from "react";
import { Popover } from "react-tiny-popover";

export function LogoutButton({ children }: { children: React.ReactNode }) {
    return <div onClick={doSignOut}>{children}</div>
}

export function LoggedInContent({ children }: { children: React.ReactNode }) {
    const { currentUser } = getUserCS();
    return currentUser ? <>{children}</> : null;
}

export function LoggedOutContent({ children }: { children: React.ReactNode }) {
    const { currentUser } = getUserCS();
    return currentUser ? null : <>{children}</>;
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

export function EmailSignInButton({ children, email, password, setErrorMessage, className, setLoading }: {
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

export function ProfileButton({ size = 30 }: { size?: number }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const { currentUser } = getUserCS();

    if (!currentUser) return <div></div>;

    return <Popover isOpen={isPopoverOpen} positions={["bottom", "left", "right", "top"]} onClickOutside={() => setIsPopoverOpen(false)} content={
        <ProfilePopup user={currentUser} />}>
        <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <ProfileButtonTrigger user={currentUser} size={size} />
        </div>
    </Popover>
}

function LogoutLogo({ height = 20, width = 20, ...props }) {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={height} width={width} id="logout"><g><path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zm13.82 5.42-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z"></path></g></svg>
}

function ProfileButtonTrigger({ user, size }: { user: User | null, size: number }) {
    const imageUrl = user?.photoURL ?? "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + (user?.displayName ?? user?.email);
    return (
        <img src={imageUrl} alt="profile" height={size} width={size} className="rounded-full" id="profileImage" style={{ cursor: "pointer" }} />
    );
};

function ProfilePopup({ user }: { user: User | null }) {

    const imageUrl = user?.photoURL ?? "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" + (user?.displayName ?? user?.email);

    const popupStyle: React.CSSProperties = {
        width: "calc(-40px + min(100vw, 370px))",
        backgroundColor: '#fff',
        border: '1px solid #00000022',
        borderRadius: 8,
        color: "#000",
        padding: 0,
        paddingTop: 10,
        margin: 10,
    };

    const profilePopupImageStyle: React.CSSProperties = {
        borderRadius: 9999,
        height: 30,
        width: 30,
        margin: 5,
        marginLeft: 13,
        marginTop: 8,
    };

    return <div style={popupStyle}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <img src={imageUrl} alt="profile" height={30} width={30} style={profilePopupImageStyle} />
            <div style={{ display: "flex", flexDirection: "column" }}>
                {user?.displayName && <div style={{
                    fontSize: 15,
                    fontWeight: 500,
                    marginLeft: 8,
                    marginRight: 13,
                    marginBottom: 0,
                }}>{user?.displayName}</div>}
                <div style={{ fontSize: 14, color: "#00000088", marginLeft: 8, marginRight: 13 }}>{user?.email}</div>
            </div>
        </div>
        <hr />
        <LogoutButton>
            <div className="profileLogout">
                <LogoutLogo />
                Log Out
            </div>
        </LogoutButton>
    </div>
};