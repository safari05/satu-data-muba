"use client";
import React from "react";

export const ButtonTab = ({ className, name, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <p className="text-white text-xs md:text-base font-semibold">{name}</p>
    </div>
  );
};
