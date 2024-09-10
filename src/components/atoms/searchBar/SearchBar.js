import Image from "next/image";
import React from "react";

export const SearchBar = ({ onChange, onClick, defaultValue }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onClick();
    }
  };
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Isu Terkini : Pendidikan dan Budaya, Ekonomi"
        className=" rounded-l-md px-3 font-normal w-[100%] text-sm h-10"
        onChange={onChange}
        defaultValue={defaultValue}
        onKeyPress={handleKeyPress}
      />
      <button
        className="bg-[#00829E] rounded-r-md w-[50px] justify-center items-center flex"
        onClick={onClick}
      >
        <Image
          src={"/assets/icons/ic-search.svg"}
          width={15.38}
          height={15}
          alt="ic-search"
        />
      </button>
    </div>
  );
};
