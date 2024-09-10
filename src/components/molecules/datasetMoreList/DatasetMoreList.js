import Link from "next/link";
import React from "react";
import { MdFileOpen } from "react-icons/md";

export const DatasetMoreList = ({ title, desc, href }) => {
  return (
    <Link
      href={href}
      className="flex gap-4 border-solid border-b-[0.7px] border-b-[#F2E5E5] pb-3 mb-4"
    >
      <div>
        <div className="flex w-14 h-14 items-center justify-center rounded-md bg-[#0D9AB9]">
          <MdFileOpen size={30} color="white" />
        </div>
      </div>
      <div>
        <h3 className="text-[#45D2B0] font-bold font-mono text-base mb-1">
          {title}
        </h3>
        <div
          className="text-white font-normal text-sm line-clamp-2"
          dangerouslySetInnerHTML={{ __html: desc || <br /> }}
        />
      </div>
    </Link>
  );
};
