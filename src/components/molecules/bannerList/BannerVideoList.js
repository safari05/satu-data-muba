import Image from "next/image";
import React from "react";

export const BannerVideoList = ({ img, desc }) => {
  return (
    <div className="group relative">
      <Image
        src={img}
        width={800}
        height={300}
        className="w-[800px] h-[350px] object-cover rounded-md"
        alt="image-banner"
      />
      <div className="absolute bottom-0 p-3 bg-[#052325C4] opacity-100 rounded-b-md transition-opacity duration-500 group-hover:opacity-10">
        <p className="text-white text-sm font-light ">{desc}</p>
      </div>
    </div>
  );
};
