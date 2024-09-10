"use client";
import { Container, ImageFallback } from "@/components/atoms";
import { DatasetRankList } from "@/components/molecules";
import { CarouselOrganization } from "@/components/molecules/carousel/CarouselOrganization";
import React, { useState } from "react";

export const DatasetRank = ({ data }) => {
  const [dataMost, setDataMost] = useState(data?.OpdBrand?.Most[0].Datasets);
  const [dataBest, setDataBest] = useState(data?.OpdBrand?.Best[0].Datasets);
  return (
    <Container>
      <div className="grid md:grid-cols-4 grid-cols-1 mb-8 gap-10">
        {/*  ORGANISASI MOST */}
        <div className="">
          <div className="flex items-center gap-4 mb-3">
            <ImageFallback
              src={"/assets/images/img-dummy-data-wheels.png"}
              width={35.14}
              height={38}
              alt="img-dummy-data-wheels"
            />
            <div>
              <h1 className="text-white font-semibold text-2xl font-mono">
                Organisasi
              </h1>
              <p className="text-white font-medium text-sm">
                <i>Data Terbanyak</i>
              </p>
            </div>
          </div>
          <CarouselOrganization
            data={data?.OpdBrand?.Most}
            setDatasets={setDataMost}
          />
        </div>

        {/* DATA ORGANISASI */}
        <div className="">
          {dataMost?.map((item, index) => {
            return (
              <DatasetRankList
                key={index}
                title={item.DatasetTitle}
                desc={item.DatasetDescription}
                lastUpdate={item?.DataHeaderLastUpdate}
                slug={item?.DataHeaderSlug}
              />
            );
          })}
        </div>

        {/*  ORGANISASI BEST */}
        <div className="">
          <div className="flex items-center gap-4 mb-3">
            <ImageFallback
              src={"/assets/images/img-dummy-data-wheels.png"}
              width={35.14}
              height={38}
              alt="img-dummy-data-wheels"
              fallbackSrc={"/assets/images/img-logo-muba.png"}
            />
            <div>
              <h1 className="text-white font-semibold text-2xl font-mono">
                Organisasi
              </h1>
              <p className="text-white font-medium text-sm">
                <i>Data Terbaru</i>
              </p>
            </div>
          </div>
          <CarouselOrganization
            data={data?.OpdBrand?.Best}
            setDatasets={setDataBest}
          />
        </div>

        {/* DATA ORGANISASI */}
        <div className="">
          {dataBest?.map((item, index) => {
            return (
              <DatasetRankList
                key={index}
                title={item.DatasetTitle}
                desc={item.DatasetDescription}
                lastUpdate={item?.DataHeaderLastUpdate}
                slug={item?.DataHeaderSlug}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};
