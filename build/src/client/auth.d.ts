import React from "react";
import { User } from "firebase/auth";
type NextFireJSContextType = {
    userLoggedIn: boolean;
    isEmailUser: boolean;
    currentUser: User | null;
};
export declare function getUserCS(): NextFireJSContextType;
export declare function NextFireJSProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export {};
