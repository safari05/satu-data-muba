import React from "react";

export const MetafieldList = ({ name, title, type, desc }) => {
  return (
    <>
      <div className="flex border-solid border-b-[0.7px] border-[#0F9199] pb-1 mb-2 gap-3">
        <div className="w-5/12 md:w-3/12">
          <p className="text-white font-normal text-sm line-clamp-1 w-auto">
            {name}
          </p>
        </div>
        <div className="w-5/12 md:w-3/12">
          <p className="text-white font-normal text-sm uppercase line-clamp-1 w-auto">
            {title}
          </p>
        </div>
        <div className="w-5/12 md:w-3/12">
          <p className="text-[#1CB3D4] font-normal text-sm">
            <code>{type}</code>
          </p>
        </div>
        <div className="w-5/12 md:w-3/12">
          <p className="text-white font-normal text-sm">{desc}</p>
        </div>
      </div>
    </>
  );
};
