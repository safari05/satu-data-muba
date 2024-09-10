"use client";
import { Navbar } from "@/components/molecules";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdList } from "react-icons/md";

export const Header = () => {
  const [animateHeader, setAnimateHeader] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 10) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed trasition ease-in-out duration-500 border-b-[0.7px] 
            border-solid 
            border-white  ${
              animateHeader ? "bg-opacity-70 shadow-xl py-3" : "py-0"
            } z-50 w-full backdrop-filter backdrop-blur-md`}
      >
        <section
          className="
            z-50
            flex 
            items-center 
            justify-between 
            py-3 
            px-8
            w-[100vw]
        "
        >
          <Link href={"/"}>
            <Image
              src={"/assets/images/logo.png?x=1"}
              width={250}
              height={53}
              alt="logo"
            />
          </Link>

          <div className="hidden md:block">
            <Navbar type="web" />
          </div>

          <div className="hidden md:block">
            <div className="flex">
              <Link
                href={"https://satudata.mubakab.go.id/admin/"}
                target="_blank"
                className="text-white font-bold text-sm p-2 bg-[#FF0000] rounded-full"
              >
                <Image
                  src={"/assets/icons/ic-menu-user.svg"}
                  width={18}
                  height={18}
                  alt="ic-menu-user"
                />
              </Link>
            </div>
          </div>

          <div className="block md:hidden">
            <div
              className="cursor-pointer"
              onClick={() => setIsShowMenu(!isShowMenu)}
            >
              <MdList color="white" size={30} />
            </div>
          </div>
        </section>
      </div>

      <div>
        <div
          className={`fixed bg-black bg-opacity-20 shadow-xl w-full z-40 h-full backdrop-filter backdrop-blur-sm  ${
            isShowMenu ? "-translate-x-0 " : "-translate-x-full"
          }`}
          onClick={() => setIsShowMenu(!isShowMenu)}
        />
        <div
          className={`fixed bg-white w-[65vw] shadow-2xl h-full overflow-y-scroll ease-in-out duration-300 z-50 px-5 py-5 ${
            isShowMenu ? "-translate-x-0 " : "-translate-x-full"
          }`}
        >
          <Navbar isShowMenu={isShowMenu} type="mobile" />
        </div>
      </div>
    </>
  );
};
