import { ImageFallback } from "@/components/atoms";
import Image from "next/image";
import React from "react";

export const ProfileOpd = ({ img, opd, desc }) => {
  return (
    <div className="bg-[#043C40] border-[1px] border-solid border-[#138489] p-5 rounded-md">
      <center>
        <ImageFallback
          src={img}
          alt="logo-opd"
          width={200}
          height={200}
          className="w-[200px] h-[200px] object-contain rounded-md mb-3 p-2"
          fallbackSrc={"/assets/images/img-logo-muba.png"}
        />
      </center>
      <h1 className="text-white font-bold text-lg font-mono">{opd}</h1>
      <p className="text-white font-normal text-sm">{desc}</p>
    </div>
  );
};
