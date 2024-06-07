import Link from "next/link";
import { IoBrowsersOutline, IoLogoReact } from "react-icons/io5";
import { SearchBar } from './SearchBar';
import { SidebarMenuItem } from "./SidebarMenuItem";

const menuItems = [
  {
    path: "/dashboard/main",
    icon: <IoBrowsersOutline size={28} />,
    title: "Dashboard",
    subtitle: "Data Overview",
  },
];


export const Sidebar = () => {



  return (
    <div id="menu"

      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-1/4 sm:w-1/2 left-0 overflow-y-scroll sm:text-center">
      <div id="logo" className="my-4 px-6">
        <SearchBar />
        <h1 className="flex items-center text-lg md:text-2xl font-bold text-white">
          <IoLogoReact className="mr-2" />
          <span>Dash</span><span className="text-blue-500">8</span>.</h1>
        <p className="text-slate-500 text-sm mb-2">Manage your actions and activities</p>
        <div className="flex justify-center">
          <Link href='/login' className="border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-200 mr-16">
            Sign In
          </Link>
          <Link href="/register" className="border-2 border-blue-900 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-900 hover:text-blue-200">
            Sign Up
          </Link>
        </div>
      </div>
      <div id="profile" className="px-6 py-2">
        <p className="text-slate-500">Welcome back,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span className="text-md text-base font-bold">

          </span>
        </a>
      </div>
      <div id="nav" className="w-full px-6">
        {
          menuItems.map((item) => (
            <SidebarMenuItem key={item.path} {...item} />
          ))
        }
      </div>
    </div>
  );
};
