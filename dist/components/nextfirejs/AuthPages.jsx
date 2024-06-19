import ForgotPasswordPage from "@/components/nextfirejs/ForgotPasswordPage";
import LoginPage from "@/components/nextfirejs/LoginPage";
import RegisterPage from "@/components/nextfirejs/RegisterPage";
export default async function AuthPages({ searchParams }) {
    const path = searchParams.path;
    return <main className="w-screen h-screen bg-white text-black">
        {path == "/login" && <LoginPage />}
        {path == "/register" && <RegisterPage />}
        {path == "/forgot-password" && <ForgotPasswordPage />}
    </main>
}