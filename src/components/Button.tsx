import { deleteItem } from "@/actions";
import { IoTrash } from "react-icons/io5";

interface ButtonProps {
  collection: string;
  id: string;
  title: string;
}

export const Button = ({
  collection,
  id,
  title,
}: ButtonProps) => {
  return (!collection || !id ? <p>
    Error: Missing collection or id
  </p> :
    <form action={deleteItem} className="flex px-2 py-1 bg-red-400 mr-1 text-white font-semibold rounded">
      <IoTrash />
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="collection" value={collection} />
      <button className="ml-1 bg-transparent hover:bg-transparent hover:text-opacity-60 text-white">{title}</button>
    </form>
  );
};
