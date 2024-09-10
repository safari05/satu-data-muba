import Image from "next/image";
import React from "react";

export const CountItem = ({ img, width, height, alt, name, count }) => {
  return (
    <div className="flex items-start gap-3">
      <Image src={img} width={width} height={height} alt={alt} />
      <div className="-mt-2">
        <h1 className="font-bold text-white md:text-2xl text-xl">
          {count?.toLocaleString("id-ID")}
        </h1>
        <p className="font-light text-white md:text-sm text-xs">{name}</p>
      </div>
    </div>
  );
};
