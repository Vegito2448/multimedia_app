'use client';
import { updateUserProfile } from "@/actions";
import { SessionData } from "@/lib";
import { getImageOrNoImage } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { IoPencil } from 'react-icons/io5';
import { AlertToast } from "./AlertToast";

interface Props {
  user: SessionData;
}

export const Profile = ({ user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useFormState<any, FormData>(updateUserProfile, { error: '', success: false, id: user.uid, collection: 'users' });
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };


  const image = getImageOrNoImage({ url: user.image, type: 'user' });

  return (
    <div
      className="w-full  p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="flex justify-between">
        <span className="text-xl font-semibold block text-gray-600 ">
          {user.role?.toUpperCase()} Profile
        </span>
        {user.role !== 'reader' && <button
          onClick={handleEditClick}
          className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
        >
          {isEditing ? 'X' : 'Edit'}
        </button>}
      </div>
      {state?.error && <AlertToast color="red" message={state.error} />}
      <span className="text-gray-600">This information is secret so be careful</span>
      <form action={formAction}>
        <div className="w-full p-8 mx-2 flex justify-center relative">
          <Image
            id="showImage"
            className="max-w-xs w-32 items-center border rounded-full"
            src={image!}
            alt="Your photo Profile"
            width={200}
            height={200}
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/webp"
                className="absolute inset-0 opacity-0"
                name="file"
              />
              <IoPencil
                color="gray"
                size="1.5em"
              />
            </>
          )}
        </div>


        <div className=" p-6 bg-white rounded-xl">
          {['name', 'userName', 'mail', 'password'].map((field) => (
            <div className="pb-6 rounded-xl" key={field}>
              <label htmlFor={field} className="font-semibold text-gray-700 block pb-1 capitalize">
                {field}
              </label>
              <div className="flex">
                <input
                  id={field}
                  name={field}
                  disabled={!isEditing}
                  className="border-1 rounded-r px-4 py-2 w-full text-stone-950"
                  type={field === 'password' ? 'password' : field === 'mail' && 'email' || 'text'}
                  defaultValue={field !== 'password' && String(user?.[field as keyof typeof user]) || ''}
                  required={field !== 'name'}
                />
              </div>
            </div>
          ))}

          <div >
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select a Role</label>
            <select
              id="role"
              name="role"
              disabled={!isEditing}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {['reader', 'creator', 'admin'].map((role) => user?.role === 'admin' && (
                <option
                  key={role}
                  value={role}
                  selected={role === user.role}
                >
                  {role}
                </option>
              ))}
            </select>
          </div>

        </div>

        {isEditing && <button

          className="w-full text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
        >
          Save 🥰
        </button>}
      </form>
    </div>
  );
};
