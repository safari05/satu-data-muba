import React from "react";

export const BadgeTagDataset = ({ name }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-[#22D4EC] px-2 py-1">
        <p className="text-[#0D0808] text-center text-xs">{name}</p>
      </div>
    </div>
  );
};
