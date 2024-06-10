import { getSession } from "@/actions";
import Link from "next/link";
import { UserMenu } from "./UserMenu";

export const Navbar = async () => {
  const session = await getSession();

  console.log(`🚀 ~ Navbar ~ session:`, session);

  return (
    <nav id="header" className="w-full z-30 top-10 bg-white shadow-lg border-b border-blue-400 mt-2 rounded">
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
        <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
          <svg className="fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div className="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
          <nav>
            <ul className="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
              <li>
                <Link
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                  href="/"
                >
                  Contents
                </Link>
              </li>
              {session.uid && <>
                <li>
                  <Link
                    className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                    href="/categories"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2"
                    href="/topics"
                  >
                    Topics
                  </Link>
                </li>
              </>}
            </ul>
          </nav>
        </div>

        <div className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
          <div className="auth flex items-center w-full md:w-full gap-x-2">
            {!session.uid && <Link
              href="/login"

              className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 hover:bg-gray-100 hover:text-gray-700">Sign in</Link>}
            {session.role !== 'reader' && <Link
              href="/register"
              className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100">Sign up {session.uid && 'an User'}</Link>}
            {session.uid && <UserMenu session={session} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

