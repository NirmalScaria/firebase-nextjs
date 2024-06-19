import ForgotPasswordPage from "./ForgotPasswordPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
export default async function AuthPages({ searchParams }) {
    const path = searchParams.path;
    return <main className="w-screen h-screen bg-white text-black">
        {path == "/login" && <LoginPage />}
        {path == "/register" && <RegisterPage />}
        {path == "/forgot-password" && <ForgotPasswordPage />}
    </main>
}