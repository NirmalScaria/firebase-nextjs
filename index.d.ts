

declare module 'nextfirejs/client/components' {
    import * as React from 'react';
    import { User } from 'firebase/auth';
    interface AuthButtonProps {
        children: React.ReactNode;
        className?: string;
    }

    interface EmailAuthButtonProps extends AuthButtonProps {
        email: string;
        password: string;
        setErrorMessage: ((message: string) => void);
        setLoading?: ((loading: boolean) => void);
    }

    interface ProfileButtonProps {
        size?: number;
    }

    interface LogoutLogoProps {
        height?: number;
        width?: number;
        [key: string]: any;
    }

    export function LogoutButton(props: AuthButtonProps): JSX.Element;

    export function GoogleSignInButton(props: AuthButtonProps): JSX.Element;

    export function EmailSignInButton(props: EmailAuthButtonProps): JSX.Element;

    export function EmailSignUpButton(props: EmailAuthButtonProps): JSX.Element;

    export function ProfileButton(props: ProfileButtonProps): JSX.Element;
}