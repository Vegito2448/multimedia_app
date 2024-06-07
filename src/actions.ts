"use server";

import { SessionData, defaultSession, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiRoute } from "./api";
import { User } from "./types";

let username = "john";
let isPro = 'admin';
let isBlocked = true;

export interface HeadersWithToken extends Headers {
  'x-token': string;
}

export interface ErrorsLogin {
  errors: Error[];
}

export interface Error {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}


export interface AuthLoggingUser {
  user?: User;
  token?: string;
  msg?: string;
  errors?: ErrorsLogin;
}





export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  // CHECK THE USER IN THE DB
  session.isBlocked = isBlocked;
  session.role = isPro;

  return session;
};

export const login = async (prevState = { error: undefined }, formData: FormData) => {
  try {
    const session = await getSession();

    const response = await fetch(apiRoute + "/auth/login", {
      method: "POST",
      body: formData,
      cache: "no-cache",
    });

    const data = await response.json();



    let errorMessage = '';
    if (data?.msg || data.errors) {
      errorMessage = data.errors?.errors.length ? data.errors.errors.map((error: Error) => error.msg).join(", ") : data.msg;
    }

    if (errorMessage) {
      Object.assign(prevState, { error: errorMessage });
    } else if (data.user) {
      session.username = data.user.userName;
      session.userId = data.user.uid;
      session.isLoggedIn = true;
      session.role = data.user.role;
      session.isBlocked = data.user.status;
      session.jwtToken = data.token;
      await session.save();
      console.log(`🚀 ~ login ~ data:`, data);
      Object.assign(prevState, { success: true });
    }

    return prevState;

  } catch (error) {
    console.error('Login failed:', error);
    return { error: 'An error occurred during login' };
  }
};

export const register = async (prevState: {
  error: string | undefined;
  success?: boolean;
} = { error: undefined }, formData: FormData) => {
  const session = await getSession();
  if (session.isLoggedIn && session.userId) {
    formData.append('createdBy', session.userId);
  }
  const response = await fetch("http://localhost:8080/api/users/", {
    method: "POST",
    body: formData,
    cache: "no-cache",
  });

  const data = await response.json();

  console.log(`🚀 ~ data:`, data);


  if (data?.name) {
    prevState.success = true;
    return prevState;
  }


  // if (data) {
  //   redirect("/login");
  // }
  // try {



  let errorMessage = '';

  if (data?.msg || data?.errors) {
    console.log(`🚀 ~ data:`, data);
    errorMessage = data.errors?.length ? data.errors.map((error: Error) => error.msg).join(", ") : data.msg;

    console.log(`🚀 ~ errorMessage:`, errorMessage);

  }

  if (errorMessage) {
    prevState.error = errorMessage;
    return prevState;
  }


  //   return prevState;

  // } catch (error: any) {
  //   console.error('Registration failed:', error);
  //   return { ...prevState, error: 'An error occurred during registration, error:' + error.message };
  // }
};


export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};

export const changePremium = async () => {
  const session = await getSession();

  const isPro = session.role;
  session.role = isPro;
  await session.save();
  revalidatePath("/profile");
};

export const changeUsername = async (formData: FormData) => {
  const session = await getSession();

  const newUsername = formData.get("username") as string;

  username = newUsername;

  session.username = username;
  await session.save();
  revalidatePath("/profile");
};

export const deleteItem = async (formData: FormData) => {

  console.log(`🚀 ~ deleteItem ~ formData:`, formData);
  const collection = formData.get('collection');

  console.log(`🚀 ~ deleteItem ~ collection:`, collection);

  const id = formData.get('id');

  console.log(`🚀 ~ deleteItem ~ id:`, id);

  const session = await getSession();

  if (session.role === 'admin') {
    await fetch(`${apiRoute}/${collection}/${id}`, {
      method: "DELETE",
      headers: {
        'x-token': session.jwtToken
      } as HeadersWithToken
    });
  }
  revalidatePath(`/${collection}`);
};