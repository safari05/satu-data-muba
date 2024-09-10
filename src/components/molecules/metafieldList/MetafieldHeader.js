import React from "react";

export const MetafieldHeader = () => {
  return (
    <div className="flex border-solid border-b-[0.7px] border-[#0F9199] pb-1 mb-2">
      <div className="w-3/12">
        <p className="text-white font-bold text-sm">Nama</p>
      </div>
      <div className="w-3/12">
        <p className="text-white font-bold text-sm">Judul</p>
      </div>
      <div className="w-3/12">
        <p className="text-white font-bold text-sm">Tipe</p>
      </div>
      <div className="w-3/12">
        <p className="text-white font-bold text-sm">Keterangan</p>
      </div>
    </div>
  );
};
