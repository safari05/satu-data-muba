"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MdCheckCircle, MdClose, MdLightbulb } from "react-icons/md";

export const ThemeColor = () => {
  const [showTheme, setShowTheme] = useState(false);
  const [colorTheme, setColorTheme] = useState("dark");
  return (
    <>
      <div
        className={`fixed top-60 md:top-52 ease-in-out duration-500 flex z-50 
        ${!showTheme ? "-translate-x-60" : "-translate-x-0"}
        `}
      >
        <div className="bg-[#F3F5FC] rounded-br-md  shadow-md">
          <div className="bg-[#138489] py-2 pl-5 pr-4">
            <h3 className="font-semibold font-mono text-white">Tema Website</h3>
          </div>
          <div
            className="flex gap-3 py-4 pl-5 pr-4 cursor-pointer hover:bg-slate-300 hover:duration-500"
            onClick={() => setColorTheme("dark")}
          >
            <div>
              <div className="border-solid border-2 border-black rounded-md mb-1">
                <Image
                  src={"/assets/images/img-theme-dark.png"}
                  width={1280}
                  height={560}
                  className="w-40 h-20 object-cover"
                  alt="img-theme-dark"
                />
              </div>
              <p className="text-sm font-normal font-mono">Dark Green</p>
            </div>
            <MdCheckCircle
              color={colorTheme === "dark" ? "#03A631" : "#A5B3BD"}
              size={25}
            />
          </div>

          <div className="border-[0.7px] border-grey-100 border-solid" />

          <div
            className="flex gap-3 py-4 pl-5 pr-4 cursor-pointer hover:bg-slate-300 hover:duration-500"
            onClick={() => setColorTheme("light")}
          >
            <div>
              <div className="border-solid border-2 border-black rounded-md mb-1">
                <Image
                  src={"/assets/images/img-theme-light.png"}
                  width={1280}
                  height={560}
                  className="w-40 h-20 object-cover mb"
                  alt="img-theme-light"
                />
              </div>
              <p className="text-sm font-normal font-mono">Light Green</p>
            </div>
            <MdCheckCircle
              color={colorTheme === "light" ? "#03A631" : "#A5B3BD"}
              size={25}
            />
          </div>
        </div>

        <div
          className="rounded-r-md p-1 bg-yellow-400 w-10 h-10 flex justify-center items-center cursor-pointer hover:bg-yellow-600 hover:duration-500"
          onClick={() => setShowTheme(!showTheme)}
        >
          <MdLightbulb color="white" />
        </div>
      </div>
    </>
  );
};
