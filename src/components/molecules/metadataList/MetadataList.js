import React from "react";

export const MetadataList = ({ label, value }) => {
  return (
    <div className="flex border-solid border-b-[0.7px] border-[#0F9199] pb-1 mb-2">
      <div className="w-3/12">
        <p className="text-white font-semibold text-sm">{label}</p>
      </div>
      <div className="w-9/12">
        <p
          className="text-white font-normal text-sm italic"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </div>
  );
};
