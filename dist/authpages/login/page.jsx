"use client";
import { getUserCS } from "nextfirejs/client/auth"
import { GoogleSignInButton, EmailSignInButton } from "nextfirejs/client/components";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

    const { currentUser } = getUserCS();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        if (e.target.type === "email") setEmail(e.target.value);
        if (e.target.type === "password") setPassword(e.target.value);
        setErrorMessage("")
    }

    return <div className="ppace-y-6 h-screen w-screen bg-white text-black flex flex-col justify-center items-center transition-all p-2">
        <div className="max-w-md flex flex-col shadow-lg border rounded-xl w-full bg-gray-100/40">
            <div className="flex flex-col border-b rounded-xl w-full  p-4 md:p-8 lg:p-10 py-10 items-center bg-white">
                {!currentUser ? <>
                    <h1 className="text-lg font-semibold">Sign in to Your App</h1>
                    <h2 className="text-sm text-gray-500 mb-8">Sign in to access your Awesome New Tool</h2>
                    <input type="email" placeholder="Email" className="w-full p-1.5 rounded-md mb-2 border text-sm focus:border-purple-400 focus:border-2 focus:outline-none" onChange={handleChange} />
                    <input type="password" placeholder="Password" className="w-full p-1.5 rounded-md mb-2 border text-sm focus:border-purple-400 focus:border-2 focus:outline-none" onChange={handleChange} />
                    {
                        errorMessage != "" &&
                        <span className="text-red-600 text-sm font-medium mb-2 w-full">
                            {errorMessage}
                        </span>
                    }
                    <EmailSignInButton email={email} password={password} setErrorMessage={setErrorMessage} setLoading={setLoading} className="w-full">
                        <button className="w-full bg-gradient-to-b from-purple-500 to-purple-600 text-white rounded-lg p-2 text-sm shadow-md hover:shadow-lg transition-all disabled:to-purple-400 disabled:from-purple-400" disabled={loading}>
                            Sign In
                        </button>
                    </EmailSignInButton>
                    <div className="flex flex-row mt-10 w-full items-center mb-8">
                        <div className="w-1/2 h-[1px] bg-gray-300"></div>
                        <p className="text-gray-400 text-sm font-normal mx-2">or</p>
                        <div className="w-1/2 h-[1px] bg-gray-300"></div>
                    </div>
                    <GoogleSignInButton className="w-full">
                        <button className="w-full bg-white text-gray-500 font-medium rounded-lg p-2 text-sm border shadow-sm hover:shadow-md transition-all flex flex-row items-center justify-center gap-2">
                            <GoogleLogo height={18} width={18} />
                            Sign in with Google
                        </button>
                    </GoogleSignInButton>
                </> : <Spinner className="h-5 w-5 my-20" />}
            </div>
            <div className="flex flex-row justify-center text-xs font-regular text-gray-500 my-2">New here?
                <Link className="text-purple-500 ml-1 cursor-pointer font-medium" href={"/register"}>Sign Up</Link>
            </div>
        </div>
    </div>
}

function GoogleLogo({ height = 24, width = 24, ...props }) {
    return <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
}

function Spinner({ className }) {
    return <div className={"animate-spin rounded-full bg-white border-gray-700 border-t-white border-2 " + className}>
    </div>
}