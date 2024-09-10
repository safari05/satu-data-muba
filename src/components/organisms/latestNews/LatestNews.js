import { Button, Container, ImageFallback } from "@/components/atoms";
import { NewsList } from "@/components/molecules";
import Image from "next/image";
import React from "react";
import { MdArrowDownward } from "react-icons/md";

export const LatestNews = ({ data }) => {
  return (
    <>
      <div className="absolute -z-10 -mt-28">
        <Image
          src={"assets/svg/ilus-bg-home.svg"}
          width={2000}
          height={800}
          alt="ilus-bg-home"
          className="w-[100vw] h-auto object-contain"
        />
      </div>
      {data?.BannerContent?.UrlFile && (
        <div className="flex justify-center mb-8">
          <ImageFallback
            src={`${data?.BannerContent?.UrlFile}?v=${new Date().getTime()}`}
            width={1180}
            height={200}
            alt="img-banner-news"
            className="md:w-[1180px] md:h-[200px] md:object-cover rounded-md"
          />
        </div>
      )}

      <Container>
        <h1 className="text-white font-semibold text-2xl text-center font-mono">
          Berita Terbaru
        </h1>
        <h1 className="text-[#FF8A00] font-medium text-xl text-center mb-5">
          Informasi Berita <i className="text-white">Satu Data</i>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {data?.News?.map((item, index) => {
            return (
              <NewsList
                key={index}
                no={1 + index}
                type={item?.Type}
                img={item?.FileName}
                alt={item?.Title}
                title={item?.Title}
                desc={item?.Description}
                lastUpdate={item?.LastUpdate}
                href={`/berita/${item?.Slug}`}
              />
            );
          })}
        </div>
        <center>
          <Button
            bgColor={"bg-[#FF8A00]"}
            icon={<MdArrowDownward size={20} color="white" />}
            name="Lihat Semua"
            isLink
            href={"/berita"}
          />
        </center>
      </Container>
    </>
  );
};
