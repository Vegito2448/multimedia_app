"use client";

import { SessionData } from "@/lib";
import { getImageOrNoImage } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LogoutForm } from "./LogoutForm";

interface Props {
  session: SessionData;

}

export const UserMenu = ({ session }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const image = getImageOrNoImage({ url: session?.image, type: 'user' });

  return (session && session.uid &&
    <div>
      <button
        onClick={toggleMenu}
        className="relative z-10 flex items-center p-2 text-xs text-gray-600 bg-white border border-transparent rounded-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
      >
        <span className="mx-1">{session?.userName || ""}</span>
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute right-0 z-20 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800 w-fit"
          onClick={() => {
            setTimeout(() => {
              setMenuOpen(false);
            }, 200);
          }}
        >
          <Link
            href="/profile"
            className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Image
              className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
              src={image || ""}
              alt="jane avatar"
              width={36}
              height={36}
            />
            <div className="mx-8">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {session?.name || ""}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {session?.mail || ""}
              </p>
            </div>
          </Link>
          {session.uid && LogoutForm()}
        </div>
      )}
    </div>
  );
};
