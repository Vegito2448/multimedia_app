import { getSession } from "@/actions";
import { Profile } from '@/components';

const page = async () => {
  const session = await getSession();
  return (
    <div className="h-full my-20">

      <Profile user={session} />

    </div>
  );
};

export default page;