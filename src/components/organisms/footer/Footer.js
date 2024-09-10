import { DatasetService } from "@/services";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default async function Footer() {
  const dataHome = await DatasetService.getHome();
  return (
    <footer className="bg-[#09646A99] mt-10">
      <div className="container mx-auto px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h1 className="text-white text-lg font-bold font-mono mb-4">
              Portal Satu Data
            </h1>
            <p className="text-white text-sm font-normal font-mono mb-5">
              Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju.
            </p>
            <Image
              src={"/assets/images/logo.png?x=1"}
              width={250}
              height={53}
              alt="logo"
            />
          </div>
          <div>
            <h1 className="text-white text-lg font-bold font-mono mb-4">
              Dataset Terbaru
            </h1>
            {dataHome?.DatasetNew?.map((item, index) => {
              return (
                <Link key={index} href={`/data/${item.Slug}`}>
                  <div className="flex items-start gap-2 border-solid border-b-[0.7px] border-white pb-1 mb-4">
                    <Image
                      src={"/assets/icons/ic-dataset-item.svg"}
                      width={12}
                      height={12}
                      alt="ic-dataset-item"
                    />
                    <p className="text-white text-sm font-normal -mt-1">
                      {item.Name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <h1 className="text-white text-lg font-bold font-mono mb-4">
              Organisasi
            </h1>
            {dataHome?.AgencyNew?.map((item, index) => {
              return (
                <Link key={index} href={`/organisasi/${item.Slug}`}>
                  <div className="flex items-start gap-2 pb-1 mb-4">
                    <Image
                      src={"/assets/icons/ic-organisasi-item.svg"}
                      width={12}
                      height={12}
                      alt="ic-organisasi-item"
                    />
                    <p className="text-white text-sm font-normal -mt-1">
                      {item.Name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            <h1 className="text-white text-lg font-bold font-mono mb-4">
              Hubungi Team Satu Data
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <Link
                href={"https://www.facebook.com/dinkominfo.muba.58"}
                target="_blank"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-white border-solid border-[0.7px]">
                  <FaFacebook size={15} color="white" />
                </div>
              </Link>
              <Link
                href={
                  "https://www.youtube.com/channel/UCSdmXSFhL4tWTn2aAAPiP5g"
                }
                target="_blank"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-white border-solid border-[0.7px]">
                  <FaYoutube size={15} color="white" />
                </div>
              </Link>
              <Link
                href={"https://instagram.com/dinkominfomuba"}
                target="_blank"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full border-white border-solid border-[0.7px]">
                  <FaInstagram size={15} color="white" />
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-2 justify-center flex-wrap gap-3">
              <div className="col-span-2">
                <Link href={"https://data.go.id/"} target="_blank">
                  <center>
                    <Image
                      src={"/assets/images/img-logo-satu-data-idn.png"}
                      width={50}
                      height={50}
                      alt="img-logo-satu-data-idn"
                    />
                    <p className="text-white font-medium text-sm mt-2">
                      SATU DATA INDONESIA
                    </p>
                  </center>
                </Link>
              </div>
              <div className="col-span-1">
                <Link href={"https://mubakab.go.id/"} target="_blank">
                  <center>
                    <Image
                      src={"/assets/images/img-logo-muba.png"}
                      width={50}
                      height={50}
                      alt="img-logo-muba"
                    />
                    <p className="text-white font-medium text-sm mt-2">
                      MUSI BANYUASIN
                    </p>
                  </center>
                </Link>
              </div>
              <div className="col-span-1">
                <Link href={"https://mubakab.go.id/"} target="_blank">
                  <center>
                    <Image
                      src={"/assets/images/img-logo-dinkominfo.png"}
                      width={50}
                      height={50}
                      alt="img-logo-dinkominfo"
                    />
                    <p className="text-white font-medium text-sm mt-2">
                      DINKOMINFO MUBA
                    </p>
                  </center>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
