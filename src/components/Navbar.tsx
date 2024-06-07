import { getSession } from "@/actions";
import Link from "next/link";
import { LogoutForm } from "./LogoutForm";

export const Navbar = async () => {
  const session = await getSession();

  console.log(`🚀 ~ Navbar ~ session:`, session);

  return (
    <nav>
      <Link href="/">Home Page</Link>
      <Link href="/categories">Categories</Link>
      <Link href="/topics">Topics</Link>
      <Link href="/contents">Contents</Link>
      <Link href="/register">register</Link>

      {!session.isLoggedIn && <Link href="/login">Login</Link>}
      {session.isLoggedIn && LogoutForm()}
    </nav>
  );
};

