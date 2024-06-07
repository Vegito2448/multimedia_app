import { getSession } from "@/actions";
import { apiRoute } from "@/api";
import { Table } from "@/components";
import { CategoriesResponse } from "@/types";

export const getCategories = async (limit = 20, from = 0): Promise<CategoriesResponse> => {
  const response: CategoriesResponse = await fetch(`${apiRoute}/categories?limit=${limit}&from=${from}`).then((res) => res.json());

  return response;

};
const CategoriesPage = async () => {
  const { total, categories } = await getCategories();
  const session = await getSession();

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2 text-center mb-12">Categories List <small>Static</small></span>
      {/*  */}

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <Table data={categories} collection="categories" />

      </div>
      <div className="w-full pt-5 px-4 mb-8 mx-auto text-white">
        <p className="text-white py-1 text-center text-lg">
          Total:<span className="text-white font-semibold">{total}</span>
        </p>
      </div>
    </div>
  );
};

export default CategoriesPage;