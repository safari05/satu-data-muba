"use client";
import { NavItem } from "@/components/atoms";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { MdHome } from "react-icons/md";

export const Navbar = ({ type }) => {
  const [isSubMenus, setIsSubMenus] = useState(false);
  let color = {
    mobile: "text-black",
    web: "text-white",
  };
  return (
    <div
      className={`
        md:flex
        items-center
        md:ml-8
        md:gap-5
        gap-y-10
        md:p-0
        md:bg-transparent
        md:h-auto
        `}
    >
      <Link
        href={"/"}
        className="text-white font-bold text-sm p-2 bg-[#22D4EC] rounded-md cursor-pointer hover:bg-[#1aaec2] hover:duration-500 md:block hidden"
      >
        <MdHome size={20} color="white" />
      </Link>
      <NavItem link={"data"} name={"DATA"} color={color[type]} />
      <NavItem link={"organisasi"} name={"ORGANISASI"} color={color[type]} />
      <NavItem link={"kategori"} name={"KATEGORI"} color={color[type]} />
      <NavItem link={"info-grafis"} name={"INFO GRAFIS"} color={color[type]} />
      <NavItem
        link={"kritik-saran"}
        name={"KRITIK & SARAN"}
        color={color[type]}
      />
      <NavItem link={"publikasi"} name={"PUBLIKASI"} color={color[type]} />
      <NavItem
        link={"statistik-sektoral"}
        name={"STATISTIK SEKTORAL"}
        color={color[type]}
      />

      <div
        className="group cursor-pointer"
        onMouseOver={() => setIsSubMenus(1)}
        onMouseOut={() => setIsSubMenus(2)}
      >
        <div className={`font-bold text-sm ${color[type]}`}>
          DAFTAR APLIKASI
        </div>
        <div
          className={`h-1 bg-[#22D4EC] w-full md:w-auto trasition rounded-full ease-in-out duration-300  opacity-0 group-hover:opacity-100`}
        />
        {isSubMenus === 1 && (
          <div className="w-auto bg-white rounded-sm px-1 py-1 gap-6 absolute z-99">
            <div className="text-sm bg-white hover:bg-gray-200 text-dark font-medium py-2 px-2 rounded-sm mb-0">
              <Link href={"https://data.go.id/"} target="_blank">
                Satu data Indonesia
              </Link>
            </div>
            <div className="text-sm bg-white hover:bg-gray-200 text-dark font-medium py-2 px-2 rounded-sm mb-0">
              <Link href={"http://geoportal.mubakab.go.id"} target="_blank">
                Geo Portal Muba
              </Link>
            </div>
            <div className="text-sm bg-white hover:bg-gray-200 text-dark font-medium py-2 px-2 rounded-sm mb-0">
              <Link href={"https://cc.mubakab.go.id/ "} target="_blank">
                Command Center Muba
              </Link>
            </div>
            <div className="text-sm bg-white hover:bg-gray-200 text-dark font-medium py-2 px-2 rounded-sm mb-0">
              <Link
                href={"https://satu.mubakab.go.id/apps/cctv/"}
                target="_blank"
              >
                CCTV Muba
              </Link>
            </div>
            <div className="text-sm bg-white hover:bg-gray-200 text-dark font-medium py-2 px-2 rounded-sm mb-0">
              <Link
                href={"https://sipd-ri.kemendagri.go.id/ewalidata/"}
                target="_blank"
              >
                E-Walidata SIPD RI
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
