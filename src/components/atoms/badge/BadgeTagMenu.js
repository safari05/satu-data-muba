import Link from "next/link";
import React from "react";

export const BadgeTagMenu = ({ name, href = "/" }) => {
  return (
    <Link href={href}>
      <div className="rounded-lg bg-[#1A808D] px-3 py-2">
        <p className="text-white text-center text-xs">{name}</p>
      </div>
    </Link>
  );
};
