import React from "react";

export const TitleDescDataset = ({ title, desc }) => {
  return (
    <>
      <h1
        className="text-white font-bold font-mono text-2xl mb-3"
        data-aos="fade-down"
      >
        {title}
      </h1>
      <div
        className="text-white font-normal text-sm"
        data-aos="fade-left"
        dangerouslySetInnerHTML={{ __html: desc || <br /> }}
      />
    </>
  );
};
