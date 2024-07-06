import ForgotPasswordPage from "/components/firebase-nextjs/ForgotPasswordPage";
import LoginPage from "/components/firebase-nextjs/LoginPage";
import RegisterPage from "/components/firebase-nextjs/RegisterPage";
export default async function AuthPages({ searchParams }) {
    const path = searchParams.path;
    if (path == "/login") {
        return <LoginPage />
    }
    if (path == "/register") {
        return <RegisterPage />
    }
    if (path == "/forgot-password") {
        return <ForgotPasswordPage />
    }
}