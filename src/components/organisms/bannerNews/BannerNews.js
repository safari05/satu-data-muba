"use client";
import { ButtonTab, Container } from "@/components/atoms";
import { BannerImageList, DatasetNewTabList } from "@/components/molecules";
import React, { useState } from "react";

export const BannerNews = ({ data }) => {
  const [numTab, setNumTab] = useState(1);

  const tabContent = () => {
    if (numTab === 1) {
      return (
        <div className="overflow-scroll min-h-[230px] max-h-[250px] overflow-x-hidden">
          {data?.TabData?.DatasetNews?.map((item, index) => {
            return (
              <DatasetNewTabList
                key={index}
                href={`/data/${item?.DatasetSlug}`}
                organization={item?.DatasetTitle}
                dataset={item?.DatasetDescription}
                lastUpdate={item?.DataHeaderLastUpdate}
              />
            );
          })}
        </div>
      );
    }
    if (numTab === 2) {
      return (
        <div className="overflow-scroll min-h-[230px] max-h-[250px] overflow-x-hidden">
          {data?.TabData?.DatasetPriority?.map((item, index) => {
            return (
              <DatasetNewTabList
                key={index}
                href={`/data/${item?.DatasetSlug}`}
                organization={item?.DatasetTitle}
                dataset={item?.DatasetDescription}
                lastUpdate={item?.DataHeaderLastUpdate}
              />
            );
          })}
        </div>
      );
    }
    if (numTab === 3) {
      return (
        <div className="overflow-scroll min-h-[230px] max-h-[250px] overflow-x-hidden">
          {data?.TabData?.News?.map((item, index) => {
            return (
              <DatasetNewTabList
                key={index}
                href={`/berita/${item?.Slug}`}
                organization={item?.Title}
                dataset={item?.Description}
                lastUpdate={item?.LastUpdate}
              />
            );
          })}
        </div>
      );
    }
  };
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 items-start mb-8 gap-10">
        <div data-aos="fade-right">
          {data?.SliderHero?.UrlFile && (
            <BannerImageList
              img={data?.SliderHero?.UrlFile}
              desc={data?.SliderHero?.Description}
            />
          )}
        </div>

        <div
          className="bg-[#003C40] shadow-csd-tab rounded-md p-5"
          data-aos="fade-left"
        >
          {/* TAB HEADER */}
          <div className="grid grid-cols-3 pb-1">
            <ButtonTab
              className="bg-[#00829E] rounded-t-md cursor-pointer px-3 py-2 z-[3]"
              onClick={() => setNumTab(1)}
              name={"Data Terbaru"}
            />
            <ButtonTab
              className="bg-[#0D9AB9] rounded-tr-md -ml-1 cursor-pointer px-3 py-2 z-[2]"
              onClick={() => setNumTab(2)}
              name={"Data Prioritas"}
            />
            <ButtonTab
              className=" bg-[#1CB3D4] rounded-tr-md -ml-1 cursor-pointer px-3 py-2"
              onClick={() => setNumTab(3)}
              name={"Berita Terbaru"}
            />
          </div>

          {/* TAB CONTENT */}
          {tabContent()}
        </div>
      </div>
    </Container>
  );
};
