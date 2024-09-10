import React from "react";

export const BrandOpdInfo = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-[#FF8A00] font-semibold text-2xl">{title}</h1>
      <h3 className="text-[#FF8A00] font-normal text-base">{subtitle}</h3>
    </div>
  );
};
