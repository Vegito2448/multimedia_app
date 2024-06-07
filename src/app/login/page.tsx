import { LoginForm } from "@/components";


const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4" /></svg>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Sign In
        </h2>
        <p className="text-gray-600 text-center mb-6">Enter your details to Login.</p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;