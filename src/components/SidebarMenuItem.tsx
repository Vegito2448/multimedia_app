'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subtitle: string;
}

export const SidebarMenuItem = ({ path, title, subtitle, icon }: Props) => {
  const pathname = usePathname();
  return (
    <Link href={path} className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 ${pathname === path ? 'bg-blue-800' : 'hover:bg-white/5'} hover:bg-white/5 transition ease-linear duration-150`}>
      <div>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 hidden md:block">{subtitle}</span>
      </div>
    </Link>
  );
};
