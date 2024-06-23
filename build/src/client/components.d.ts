import "./ProfileButtonStyle.css";
import React from "react";
export declare function LogoutButton({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function GoogleSignInButton({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element;
export declare function EmailSignInButton({ children, email, password, setErrorMessage, className, setLoading }: {
    children: React.ReactNode;
    email: string;
    password: string;
    setErrorMessage: (msg: string) => any;
    className?: string;
    setLoading?: (loading: boolean) => any;
}): React.JSX.Element;
export declare function EmailSignUpButton({ children, email, password, setErrorMessage, className, setLoading }: {
    children: React.ReactNode;
    email: string;
    password: string;
    setErrorMessage: (msg: string) => void;
    className?: string;
    setLoading?: (loading: boolean) => void;
}): React.JSX.Element;
export declare function ProfileButton({ size }: {
    size: number;
}): React.JSX.Element | null;
