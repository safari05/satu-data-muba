import Link from "next/link";
import React from "react";
import { MdFileOpen } from "react-icons/md";

export const MenuDatasetFormatList = ({ name, count, href }) => {
  return (
    <Link
      href={href}
      className="group flex text-white items-center gap-3 hover:text-[#22D4EC] duration-500 mb-3"
    >
      <div>
        <MdFileOpen size={15} color="white" />
      </div>
      <p className=" font-normal text-sm">
        {name} ({count})
      </p>
    </Link>
  );
};
