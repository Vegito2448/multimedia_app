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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Bienvenido</h1>
      <span>
        {session.isLoggedIn && (
          session.username
        )}
      </span>
      <FilteredContents contents={contents} />
    </main>
  );
}
