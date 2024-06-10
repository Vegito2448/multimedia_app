"use client";

import { login } from "@/actions";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { AlertToast } from './AlertToast';



export const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, { error: undefined, success: false });
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            {state?.error && <AlertToast color="red" message={state.error} />}
            <form action={
              formAction
            } className="mt-10">
              <fieldset className="block mt-3 text-lg text-gray-700 text-center font-semibold">
                <legend>Login</legend>


                <div>
                  <input type="text" placeholder="Email or Username" className="mt-1 block w-full border-none bg-gray-500 h-11 rounded-xl shadow-lg hover:bg-blue-500 focus:bg-blue-600 focus:ring-0"
                    name="mail"
                    required
                  />
                </div>

                <div className="mt-7">
                  <input type="password" placeholder="Password" className="mt-1 block w-full border-none bg-gray-500 h-11 rounded-xl shadow-lg hover:bg-blue-500 focus:bg-blue-600 focus:ring-0" name="password" required />
                </div>

                <div className="mt-7">
                  <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Login
                  </button>
                </div>

                <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2" >¿Eres nuevo?</label>
                    <Link href="/register" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Crea una cuenta
                    </Link>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


