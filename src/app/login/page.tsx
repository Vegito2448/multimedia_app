import { LoginForm } from "@/components";

export const metadata = {
  title: "Login Page",
  description: "Welcome to the login page!"
};

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
};

export default LoginPage;