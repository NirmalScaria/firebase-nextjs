export declare const doCreateUserWithEmailAndPassword: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
export declare const doSignInWithEmailAndPassword: (email: string, password: string) => Promise<import("@firebase/auth").UserCredential>;
export declare const doSignInWithGoogle: () => Promise<import("@firebase/auth").UserCredential>;
export declare function doSignOut(): Promise<void>;
export declare const doPasswordReset: (email: string) => Promise<void>;
export declare const doPasswordChange: (password: string) => Promise<void>;
export declare const doSendEmailVerification: () => Promise<void>;
