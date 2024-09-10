import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight, MdLabelImportant } from "react-icons/md";

export const MenuDatasetList = ({ name, count, href, isActive }) => {
  return (
    <div className="border-b-[0.7px] border-white pb-2 mb-3 flex justify-between items-center">
      <div className="flex items-center justify-start gap-x-3">
        <div>
          <MdLabelImportant size={15} color="white" />
        </div>
        <Link
          href={href}
          className="text-white font-normal text-sm hover:text-[#22D4EC] duration-500"
        >
          {name} ({count})
        </Link>
      </div>
      <div>
        <MdKeyboardArrowRight size={15} color="white" />
      </div>
    </div>
  );
};
