import { getSession } from "@/actions";
import { RegisterForm } from '@/components/RegisterForm';

const RegisterPage = async () => {
  const session = await getSession();
  return (
    <div className="flex items-center justify-center h-screen">
      {<RegisterForm userLogged={session} />}
    </div>
  );
};

export default RegisterPage;