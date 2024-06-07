
'use client';
import { Content } from "@/types";
import { ChangeEventHandler, useState } from "react";
interface Props {
  contents: Content[];
}
const FilteredContents = ({
  contents
}: Props) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Buscar por temática"
        value={searchTerm}
        onChange={handleSearch}
      />
      <input
        type="text"
        placeholder="Buscar por nombre de contenido"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {/* I've made backend filtering but i don't have time to implement it PostMan*/}
        {contents.filter(content => content.title.includes(searchTerm) || content?.topic?.name.includes(searchTerm)).map(content => (
          <div key={content._id}>
            <h3>{content.title}</h3>
            <p>Tipo: {content.type}</p>
            <p>Temática: {content.topic?.name}</p>
            <p>Creado por: {content.createdBy.name}</p>
          </div>
        ))}
      </div>
    </form>
  );
};

export default FilteredContents;