import { logout } from "@/actions";

export const LogoutForm = () => {

  return (
    <form action={logout}>
      <button
        className="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white w-full"
      >
        Sign Out
      </button>
    </form>
  );
};
