import Link from "next/link";
import React from "react";

export const Button = ({ name, onClick, bgColor, icon = "", isLink, href }) => {
  return isLink ? (
    <Link href={href}>
      <button
        className={`${bgColor} text-center justify-center text-white font-bold md:text-base text-sm px-3 py-2 rounded-md flex items-center ${
          icon && "gap-2"
        }`}
      >
        {icon}
        {name}
      </button>
    </Link>
  ) : (
    <button
      type="button"
      className={`${bgColor} text-center justify-center text-white font-bold md:text-base text-sm px-3 py-2 rounded-md flex items-center ${
        icon && "gap-2"
      }`}
      onClick={onClick}
    >
      {icon}
      {name}
    </button>
  );
};
