"use client";

import { login } from "@/actions";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { AlertToast } from "./AlertToast";


export const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, { error: undefined, success: false });

  useEffect(() => {
    if (state?.success) {
      redirect('/');
    }
  }, [state]);



  return (
    <form action={formAction}>
      <input type="text" name="mail" required placeholder="username or Email" />
      <br />
      <input type="password" name="password" required placeholder="password" />
      <br />
      <button>Login</button>
      {state?.error && <AlertToast color="red" message={state.error} />}
    </form>
  );
};


