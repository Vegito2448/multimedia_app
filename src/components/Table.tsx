import { getSession } from "@/actions";
import { User } from "@/types";
import Link from "next/link";
import { IoPencil } from "react-icons/io5";
import { Button } from "./Button";
import { Chip } from "./Chip";

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
                  <tr key={item._id + index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>

                    {
                      headers.map((header: keyof typeof item, index) => (
                        <td key={item?._id + index} className="text-left py-3 px-2 ">{
                          (header === 'createdBy' || header === 'updatedBy' || header === 'deletedBy') ?

                            (item[header] as User)?.userName :

                            (typeof item[header] === 'boolean' &&
                              <Chip color={item[header] ? "green" : 'red'} message={
                                item[header] ? 'Active' : 'Inactive'
                              } />
                            ) ||
                            (item[header].length > 18 &&
                              <span className="truncate">
                                {item[header].slice(0, 3)}...
                              </span>
                            ) ||
                            item[header] as string}
                        </td>
                      ))
                    }
                    {
                      cruPermissions && <td className="w-1/3 text-left py-3 px-4 flex flex-1">
                        <Link href={`categories/${item?._id || item?.id || item?.uid}`} className="px-4 py-1 text-xs font-medium leading-6 text-center text-white uppercase transition bg-sky-500 rounded shadow ripple hover:shadow-lg hover:bg-sky-700 focus:outline-none flex place-items-center">
                          <IoPencil />
                          <span className="ml-1">Edit</span>
                        </Link>
                        {deletePermissions && <Button id={
                          item?._id || item?.id || item?.uid
                        } collection={collection} title="Delete" />}
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
  );
};
