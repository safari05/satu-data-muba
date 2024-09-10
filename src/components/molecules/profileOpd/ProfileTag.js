import { BadgeTagMenu } from "@/components/atoms";
import React from "react";

export const ProfileTag = ({ name }) => {
  return (
    <div className="bg-[#043C40] border-solid border-2 border-[#138489] p-7 rounded-md mb-4">
      <div className="mb-5 flex items-center gap-3">
        <h1 className="text-white text-xl font-bold">TAG DATASET</h1>
        <div className="w-12 h-2 bg-[#22D4EC] rounded-lg" />
      </div>
      <BadgeTagMenu name={name} />
    </div>
  );
};
