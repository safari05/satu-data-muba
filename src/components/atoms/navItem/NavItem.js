import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavItem = ({ link, name, color, newTab }) => {
  const pathName = usePathname().split("/")[1];

  return (
    <div className="group">
      <Link
        href={`${!newTab ? "/" : ""}${link}`}
        className={`font-bold text-sm ${color} `}
        target={newTab ? "_blank" : "_self"}
      >
        {name}
      </Link>
      <div
        className={`h-1 bg-[#22D4EC] w-auto trasition rounded-full ease-in-out duration-300 ${
          pathName === link ? "opacity-100" : "opacity-0"
        }  group-hover:opacity-100`}
      />
    </div>
  );
};
