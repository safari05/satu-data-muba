import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NewsTabList = ({ href, organization, dataset }) => {
  return (
    <Link href={href} className="group relative flex items-start gap-3 mb-3">
      <Image
        src={"/assets/icons/ic-chevron-right.svg"}
        width={8.81}
        height={13}
        alt="ic-chevron-right"
      />
      <div className="-mt-1 pb-2 border-b-[0.7px] border-solid border-white">
        <h5 className="font-semibold text-white text-sm">{organization}</h5>
        <p className="font-light text-white text-xs line-clamp-3">{dataset}</p>
      </div>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
    </Link>
  );
};
