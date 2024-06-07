"use client";

import { register } from "@/actions";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { AlertToast } from "./AlertToast";


export const RegisterForm = () => {
  const [state, formAction] = useFormState<any, FormData>(register, { error: undefined, success: false });

  console.log(`🚀 ~ RegisterForm ~ state:`, state);


  useEffect(() => {
    if (state?.success) {
      redirect('/');
    }
  }, [state]);



  return (
    <form action={formAction}>
      <input type="text" name="name" required placeholder="Name *" aria-required />
      <br />
      <input type="email" name="mail" required placeholder="Email *" aria-required />
      <br />
      <input type="text" name="userName" required placeholder="UserName *" aria-required />
      <br />
      <input type="password" name="password" required placeholder="password *" aria-required />
      <br />
      <label htmlFor="role">Choose a Role *:</label>
      <select name="role" id="role">
        <option value="creator">Creator</option>
        <option value="reader">Reader</option>
      </select>
      <br />
      <button>Registe</button>
      {state?.error && <AlertToast color="red" message={state.error} />}
    </form>
  );
};


