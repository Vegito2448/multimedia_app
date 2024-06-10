
'use client';
import { Content } from "@/types";
import { CardContent } from "./CardContent";
import { SearchBar } from './SearchBar';
interface Props {
  contents: Content[];
}
const FilteredContents = ({
  contents
}: Props) => {


  return (
    <div>
      <button
        className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
      >
        Primary
      </button>
      <div
        className="flex items-center justify-between"
      >
        <SearchBar placeholder="Search By topic" />
        <SearchBar placeholder="Search By Content" />
      </div>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 w-full px-4 mx-auto"
      >
        {/* I've made backend filtering but i don't have time to implement it PostMan*/}
        {contents.map(content => (
          <CardContent key={content._id} {...content} />
        ))}
      </div>
    </div>
  );
};

export default FilteredContents;