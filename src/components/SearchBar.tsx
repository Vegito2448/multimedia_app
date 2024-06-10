import { IoSearch } from "react-icons/io5";

interface Props {
  placeholder: string;
}

export const SearchBar = ({ placeholder }: Props) => {
  return (
    <div className="pt-2 relative mx-auto text-gray-600">
      <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
        type="search" name="search" placeholder={placeholder} />
      <button className="absolute right-0 top-0 mt-5 mr-4">
        <IoSearch
        />
      </button>
    </div>
  );
};
