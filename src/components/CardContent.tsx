import { verifyIfFilePathIsAnImage } from "@/utils";
import Image from "next/image";
import { Content } from '../types/index';

interface CardContentProps extends Content { }

const noImage = "/no-image.jpg";

const userNoImage = "/user-no-image.webp";



export const CardContent = ({ title, description, createdBy, filePath }: CardContentProps) => {

  const image = verifyIfFilePathIsAnImage(filePath) ? filePath : noImage;

  return (
    <>
      <div className="relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-0 overflow-hidden rounded-lg bg-transparent bg-clip-border text-gray-700 shadow-none">
          <Image
            src={image!}
            alt={title}
            layout="responsive"
            width={100}
            height={100}
            role="img"
          />
        </div>
        <div className="p-6">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {title}
          </h4>
          <p className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2 ">
            <Image
              alt={createdBy?.userName || "User"}
              src={createdBy?.image || userNoImage}
              className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
              data-tooltip-target="author-1"
              width={36}
              height={36}
            />
            <p>{createdBy?.userName || ""}</p>
          </div>
        </div>
      </div>
    </>
  );
};
