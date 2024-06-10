import { getSession } from "@/actions";
import { apiRoute } from "@/api";
import { ContentsResponse } from "@/types";
import FilteredContents from '../components/FilteredContents';
export const getContents = async (limit = 20, from = 0): Promise<ContentsResponse> => {
  const response: ContentsResponse = await fetch(`${apiRoute}/contents?limit=${limit}&from=${from}`,
    {
      cache: "no-cache",
    }
  ).then((res) => res.json());

  return response;

};
export default async function Home() {
  const { contents, total } = await getContents();

  const session = await getSession();

  console.log(`🚀 ~ Home ~ session:`, session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className="flex flex-col items-center justify-center w-full h-1/4 bg-gray-100 rounded-lg shadow-lg p-8"
      >
        <h1
          className="text-4xl font-bold text-gray-800"
        >Bienvenido</h1>
        <span
          className="text-gray-500"
        >
          {session.uid && (
            session.userName
          )}
        </span>
      </div>

      <FilteredContents contents={contents} />
    </main>
  );
}
