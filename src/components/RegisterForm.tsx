"use client";

import { register } from "@/actions";
import { SessionData } from "@/lib";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { IoImage } from "react-icons/io5";
import { AlertToast } from "./AlertToast";

interface RegisterFormProps {
  userLogged?: SessionData;
}
export const RegisterForm = ({ userLogged }: RegisterFormProps) => {

  console.log(`🚀 ~ RegisterForm ~ userLogged:`, userLogged);

  const [state, formAction] = useFormState<any, FormData>(register, { error: undefined, success: false });

  useEffect(() => {


    if (state?.success) {
      redirect('/');
    }
  }, [state]);


  // <form action={formAction}>
  //   <input type="text" name="name" required placeholder="Name *" aria-required />
  //   <br />
  //   <input type="email" name="mail" required placeholder="Email *" aria-required />
  //   <br />
  //   <input type="text" name="userName" required placeholder="UserName *" aria-required />
  //   <br />
  //   <input type="password" name="password" required placeholder="password *" aria-required />
  //   <br />
  //   <label htmlhtmlhtmlFor="role">Choose a Role *:</label>
  //   <select name="role" id="role">
  //     <option value="creator">Creator</option>
  //     <option value="reader">Reader</option>
  //   </select>
  //   <br />
  //   <button>Registe</button>
  //   {state?.error && <AlertToast color="red" message={state.error} />}
  // </form>

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
                {userLogged?.uid && <span>{userLogged?.userName} You&apos;re going to Register an User 🥰</span>}
                <legend>Register</legend>


                <div>
                  <input type="email" placeholder="Email *" className="mt-1 block w-full border-none bg-gray-500 h-11 rounded-xl shadow-lg hover:bg-blue-500 focus:bg-blue-600 focus:ring-0"
                    name="mail" required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your Beautiful Born name"
                    className="mt-1 block w-full border-none bg-gray-500 h-11 rounded-xl shadow-lg hover:bg-blue-500 focus:bg-blue-600 focus:ring-0"
                    name="name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Username *"
                    className="mt-1 block w-full border-none bg-gray-500 h-11 rounded-xl shadow-lg hover:bg-blue-500 focus:bg-blue-600 focus:ring-0"
                    name="userName"
                    required
                  />
                </div>


                <div className="mt-7">
                  <input
                    type="password"
                    placeholder="Password *"
                    className="mt-1 block w-full border-none bg-gray-500 h-11 rounded-xl shadow-lg hover:bg-blue-500 focus:bg-blue-600 focus:ring-0"
                    name="password"
                    required
                    minLength={8}
                  />
                </div>
                <div className="mt-7">
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a Role</label>
                  <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="reader" selected>Reader</option>
                    <option value="creator">Creator</option>
                    {userLogged?.role === "admin" && <option value="admin">Admin</option>}
                  </select>
                </div>

                <div className="mt-7">
                  <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
                    <label htmlFor="upload" className="flex flex-col items-center gap-2 cursor-pointer">
                      <IoImage
                        color="#3182ce"
                        size="1.5em"
                      />
                      <span className="text-gray-600 font-medium">Upload You&apos;r Image, Only if you want 👉🏿👈🏿</span>
                    </label>
                    <input id="upload" type="file" name="file" className="hidden" accept="image/jpeg, image/png, image/jpg, image/webp" />
                  </div>
                </div>

                <div className="mt-7">
                  <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Register
                  </button>
                </div>

                {!userLogged?.uid && <div className="mt-7">
                  <div className="flex justify-center items-center">
                    <label className="mr-2" >¿Ya tienes una Cuenta?</label>
                    <Link href="/register" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                      Sign in
                    </Link>
                  </div>
                </div>}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


