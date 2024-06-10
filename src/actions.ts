"use server";

import { SessionData, defaultSession, sessionOptions } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiRoute } from "./api";
import { User } from "./types";

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

  if (!session.uid) {
    Object.assign(session, defaultSession);
  }

  return session;
};

export const login = async (prevState = { error: undefined }, formData: FormData) => {
  const session = await getSession();
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    body: formData,
    cache: "no-cache",
  });
  const data: AuthLoggingUser = await response.json();

  console.log(`🚀 ~ login ~ data:`, data);


  let errorMessage;

  if (data?.msg || data.errors) {
    errorMessage = data.errors?.errors?.length ? data.errors.errors.map((error: Error) => error.msg).join(", ") : data.msg;
  }


  if (errorMessage) {

    Object.assign(prevState, { error: errorMessage });

  } else if (data.user) {

    Object.assign(session, {
      ...data.user,
      jwtToken: data.token,
    });

    await session.save();


    Object.assign(prevState, { success: true });

  }

    return prevState;

};

export const register = async (prevState: {
  error: string | undefined;
  success?: boolean;
} = { error: undefined }, formData: FormData) => {
  const session = await getSession();

  if (session.uid) {
    formData.append('createdBy', session.uid);
  }
  const response = await fetch("http://localhost:8080/api/users/", {
    method: "POST",
    body: formData,
    cache: "no-cache",
    headers: {
      'x-token': session.jwtToken
    } as HeadersWithToken
  });

  const data = await response.json();

  console.log(`🚀 ~ data:`, data);


  if (data?.name) {
    prevState.success = true;
  }

  let errorMessage = '';

  if (data?.msg || data?.errors) {
    console.log(`🚀 ~ data:`, data);
    errorMessage = data.errors?.length ? data.errors.map((error: Error) => error.msg).join(", ") : data.msg;

    console.log(`🚀 ~ errorMessage:`, errorMessage);

  }

  if (errorMessage) {
    prevState.error = errorMessage;
  }

  return prevState;

};


export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
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

export const updateItem = async (state: { error?: string; success: boolean; id: string, collection: string; }, formData: FormData) => {

  const { id, collection } = state;

  const session = await getSession();

  if (session.role === 'admin' || session.role === 'creator') {
    const response = await fetch(`${apiRoute}/${collection}/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        'x-token': session.jwtToken
      } as HeadersWithToken
    });

    const data = await response.json();

    if (!data?.user && data?.msg) {
      Object.assign(state, { error: 'An error occurred during update, error: ' + data.msg });
    }

  }
  revalidatePath(`/${collection}`);
  return state;
};

export const updateUserProfile = async (state: { error?: string; success: boolean; id: string, collection: string; }, formData: FormData) => {

  console.log(`🚀 ~ updateUserProfile ~ formData:`, formData);


  const { id, collection } = state;

  const session = await getSession();

  if (session.role === 'admin' || session.role === 'creator') {
    const response = await fetch(`${apiRoute}/${collection}/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        'x-token': session.jwtToken
      } as HeadersWithToken
    });

    const data = await response.json();

    console.log(`🚀 ~ updateUserProfile ~ data:`, data);


    if (!data?.user && data?.msg) {
      Object.assign(state, { error: 'An error occurred during update, error: ' + data.msg });
    } else {
      Object.assign(state, { success: true });
      Object.assign(session, data.user);

      await session.save();
    }

  }
  revalidatePath(`/${collection}`);
  return state;
};

export const findByCollectionAndTerm = async (collection: string, term: string) => {

  const session = await getSession();

  const response = await fetch(`${apiRoute}/find/${collection}/${term}`, {
    headers: {
      'x-token': session.jwtToken
    } as HeadersWithToken
  });

  const data = await response.json();

  return data;

};