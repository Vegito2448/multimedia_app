import { getSession } from "@/actions";
import Link from "next/link";
import { IoPencil } from "react-icons/io5";
import { Chip } from "./Chip";
import { DeleteButton } from "./DeleteButton";

interface TableProps {
  data: any;
  collection: 'categories';
}

export const Table = async ({
  data,
  collection,
}: TableProps) => {
  // select Interface based on collection
  const uniqueKeysObj = data.reduce((keys: any, item: any) => {
    Object.keys(item).forEach((key) => keys[key] = true);
    return keys;
  }, {});

  const session = await getSession();
  const headers = Object.keys(uniqueKeysObj);

  const deletePermissions = session.role === 'admin';
  const cruPermissions = deletePermissions || session.role === 'creator';
  const readPermissions = cruPermissions || session.role === 'user';

  return (
    <div className="md:px-32 py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200 w-fit">
        {data.length ? <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              {
                headers.map((header, index) => (
                  <th key={index} className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">{header}</th>
                ))
              }
              {/* map action if is admin or creator */}
              {cruPermissions && <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm ">Action</th>}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {
              data.map((item: any, index: number) => {

                console.log(`🚀 ~ data.map ~ item:`, item);


                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    {/* map with headers */}
                    {
                      headers.map((header, index) => (
                        <td key={item?._id} className="w-1/3 text-left py-3 px-4">{collection === 'categories' && header === 'createdBy' || header === 'updatedBy' || header === 'deletedBy' ? (item[header] as { name: string; })?.name :
                          typeof item[header] === 'boolean' &&
                          <Chip color={item[header] ? "green" : 'red'} message={
                            item[header] ? 'Active' : 'Inactive'
                          } />
                          ||
                          item[header] as string}</td>
                      ))
                    }
                    {
                      cruPermissions && <td className="w-1/3 text-left py-3 px-4 flex flex-1">
                        <Link href={`categories/${item?._id || item?.id || item?.uid}`} className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded">
                          <IoPencil />
                          <span className="ml-1">Edit</span>
                        </Link>
                        {deletePermissions && <DeleteButton id={
                          item?._id || item?.id || item?.uid
                        } collection={collection} />}
                      </td>

                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table> :
          <div className="flex justify-center items-center h-32">
            <span className="text-2xl text-gray-500">No data</span>
          </div>
        }
      </div>
    </div>
  );
};
