import React from "react";

export const ButtonPagination = ({ content, onClick, active, disabled }) => {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? "bg-[#FFC700] text-white" : "text-white"}
      ${
        !disabled
          ? "bg-[#1A808D] hover:bg-[#105059] hover:text-white"
          : "text-red-300 bg-[#1A808D] cursor-not-allowed"
      }
	      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
