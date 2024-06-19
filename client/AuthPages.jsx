import ForgotPasswordPage from "@/components/nextfirejs/ForgotPasswordPage";
import LoginPage from "@/components/nextfirejs/LoginPage";
import RegisterPage from "@/components/nextfirejs/RegisterPage";
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