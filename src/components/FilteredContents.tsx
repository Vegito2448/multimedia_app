
'use client';
import { findByCollectionAndTerm } from "@/actions";
import { Content } from "@/types";
import { useState } from "react";
import { CardContent } from "./CardContent";
import { SearchBar } from './SearchBar';
interface Props {
  contents: Content[];
}
const searchContent = async () => {

};
const FilteredContents = ({
  contents
}: Props) => {
  const [contentToRender, setContentToRender] = useState(contents);

  const handleSearch = (value: string) => {

    if (value === '') return setContentToRender(contents);
    findByCollectionAndTerm('contents', value).then((res) => {


      setContentToRender(res.results);
    });

  }

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
        <SearchBar placeholder="Search By Content" onChange={handleSearch} />
      </div>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 w-full px-4 mx-auto"
      >
        {/* I've made backend filtering but i don't have time to implement it PostMan*/}
        {contentToRender.map(content => (
          <CardContent key={content._id} {...content} />
        ))}

        <span>contents quantities - {contentToRender?.length || 0}</span>
      </div>
    </div>
  );
};

export default FilteredContents;