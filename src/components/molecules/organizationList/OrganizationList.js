import { ImageFallback } from "@/components/atoms";
import Link from "next/link";
import React from "react";
import { MdArrowRight, MdFileOpen } from "react-icons/md";

export const OrganizationList = ({ img, alt, opd, desc, count, href }) => {
  return (
    <div className="group bg-[#138489] rounded-xl p-10 min-h-[400px]">
      <ImageFallback
        src={img}
        alt={alt}
        width={100}
        height={100}
        className="w-[100px] h-[100px] object-contain rounded-md mb-3 bg-white p-2
        transition duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6"
        fallbackSrc={"/assets/images/img-logo-muba.png"}
      />
      <h3 className="text-white font-bold font-mono text-xl">{opd}</h3>
      <p className="text-white font-normal text-sm line-clamp-2 mb-5">{desc}</p>
      <div className="flex items-start mb-8">
        <Link
          href={href}
          className="flex items-center bg-[#EF5F5F] rounded-full px-4 py-2 text-white text-center text-xs hover:bg-[#c54d4d] duration-500 cursor-pointer"
        >
          Selengkapnya
          <MdArrowRight size={15} color="white" />
        </Link>
      </div>
      <h1 className="text-white font-bold text-4xl">{count}</h1>
      <div className="flex items-center gap-2">
        <MdFileOpen size={15} color="white" />
        <p className="text-white font-normal text-sm">Dataset</p>
      </div>
    </div>
  );
};
