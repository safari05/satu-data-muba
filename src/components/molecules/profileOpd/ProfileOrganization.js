import { ImageFallback } from "@/components/atoms";
import Image from "next/image";
import React from "react";
import { MdFileOpen } from "react-icons/md";

export const ProfileOrganization = ({ img, opd, desc, totDataset }) => {
  return (
    <div
      className="bg-[#043C40] border-solid border-2 border-[#138489] pt-9 pb-5 px-7 rounded-md mb-4"
      data-aos="fade-right"
      data-aos-delay="300"
    >
      <div className="mb-5 flex items-center gap-3">
        <h1 className="text-white text-xl font-bold">ORGANISASI</h1>
        <div className="w-12 h-2 bg-[#22D4EC] rounded-lg" />
      </div>
      <center>
        <ImageFallback
          src={img}
          alt={opd}
          width={150}
          height={150}
          className="w-[150px] h-[150px] object-contain rounded-md mb-5 bg-white p-2"
          fallbackSrc={"/assets/images/img-logo-muba.png"}
        />
      </center>
      <h1 className="text-white text-xl font-bold uppercase">{opd}</h1>
      <p className="text-white mb-5">{desc}</p>
      <center>
        <h1 className="text-white font-bold text-4xl">{totDataset}</h1>
        <div className="flex items-center gap-2 justify-center">
          <MdFileOpen size={15} color="white" />
          <p className="text-white font-normal text-sm">Dataset</p>
        </div>
      </center>
    </div>
  );
};
