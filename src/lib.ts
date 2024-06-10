import { SessionOptions } from "iron-session";
import { User } from "./types";

export interface SessionData extends User {
  jwtToken?: string;
}

export const defaultSession: SessionData = {
  name: "",
  userName: "",
  mail: "",
  status: false,
  google: false,
  uid: "",
  role: "",
  image: ""
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }
};