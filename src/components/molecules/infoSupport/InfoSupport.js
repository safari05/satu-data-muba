import React from "react";
import { MdCall, MdMail } from "react-icons/md";

export const InfoSupport = ({ telp, mail }) => {
  return (
    <div className="bg-[#FF6B00] p-5 rounded-md">
      <h1 className="text-white font-bold text-lg mb-3">Pusat Informasi</h1>
      <div className="flex items-center gap-2 mt-2">
        <MdCall size={25} color="white" />
        <p className="text-white text-base font-medium">{telp}</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <MdMail size={25} color="white" />
        <p className="text-white text-base font-medium">{mail}</p>
      </div>
    </div>
  );
};
