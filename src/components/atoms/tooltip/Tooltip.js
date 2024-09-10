import React from "react";

export const Tooltip = ({ name }) => {
  const toPascalCase = (sentence) =>
    sentence
      .toLowerCase()
      .replace(new RegExp(/[-_]+/, "g"), " ")
      .trim()
      .split(" ")
      .map((word) => word[0].toUpperCase().concat(word.slice(1)))
      .join(" ");

  return (
    <span
      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-3 py-2 text-xs text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-9 opacity-0 m-4 mx-auto"
    >
      {toPascalCase(name)}
    </span>
  );
};
