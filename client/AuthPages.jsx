import ForgotPasswordPage from "@/components/nextfire/ForgotPasswordPage";
import LoginPage from "@/components/nextfire/LoginPage";
import RegisterPage from "@/components/nextfire/RegisterPage";
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