import { Container, ImageFallback, Tooltip } from "@/components/atoms";
import { BrandOpdInfo } from "@/components/molecules";
import Link from "next/link";
import React from "react";

export const BrandOpd = ({ data }) => {
  return (
    <div className="bg-[#052325] mb-8">
      <Container className="py-3">
        <div className="border-y-[0.7px] border-solid border-white py-3 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex items-center gap-8" data-aos="zoom-in">
            <BrandOpdInfo title={"OPD"} subtitle={"Data Terbanyak"} />
            {data?.OpdBrand?.Most?.map((item, index) => {
              return (
                <Link key={index} href={`/organisasi/${item.Slug}`}>
                  <div className="group flex relative cursor-pointer">
                    <ImageFallback
                      src={item?.FileLogo}
                      width={70}
                      height={70}
                      className="w-[80px] h-[80px] p-1 md:object-cover object-contain"
                      alt={item?.NamaOpd}
                      fallbackSrc={"/assets/images/img-logo-muba.png"}
                    />
                    <Tooltip name={item?.NamaOpd} />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-8" data-aos="zoom-in">
            <BrandOpdInfo title={"OPD"} subtitle={"Data Terbaru"} />
            {data?.OpdBrand?.Best?.map((item, index) => {
              return (
                <Link key={index} href={`/organisasi/${item.Slug}`}>
                  <div className="group flex relative cursor-pointer">
                    <ImageFallback
                      src={item?.FileLogo}
                      width={70}
                      height={70}
                      className="w-[80px] h-[80px] p-1 md:object-cover object-contain"
                      alt={item?.NamaOpd}
                      fallbackSrc={"/assets/images/img-logo-muba.png"}
                    />
                    <Tooltip name={item?.NamaOpd} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};
