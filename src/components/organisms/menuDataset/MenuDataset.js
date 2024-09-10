import { BadgeTagMenu } from "@/components/atoms";
import { MenuDatasetFormatList, MenuDatasetList } from "@/components/molecules";
import { useDatasetInfoQuery } from "@/hooks";
import Link from "next/link";
import React from "react";
import { MdArrowCircleDown } from "react-icons/md";

export const MenuDataset = ({ initialData }) => {
  const datasetInfoQuery = useDatasetInfoQuery(initialData);
  const { data, isLoading, isFetching, error } = datasetInfoQuery;
  return (
    <>
      {/* ORGANISASI */}
      <div
        className="bg-[#043C40] border-solid border-2 border-[#138489] pt-9 pb-5 px-7 rounded-md mb-4"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        <div className="mb-5 flex items-center gap-3">
          <h1 className="text-white text-xl font-bold">ORGANISASI</h1>
          <div className="w-12 h-2 bg-[#22D4EC] rounded-lg" />
        </div>
        <div>
          {data?.Agency?.map((item, index) => {
            return (
              <MenuDatasetList
                key={index}
                name={item.Name}
                count={item.DatasetCount}
                href={`/organisasi/${item.Slug}`}
              />
            );
          })}
        </div>
        <div className="mt-5 flex justify-center cursor-pointer">
          <Link href={"/organisasi"}>
            <MdArrowCircleDown
              size={25}
              color="white"
              className="self-center"
            />
          </Link>
        </div>
      </div>

      {/* KATEGORI */}
      <div
        className="bg-[#043C40] border-solid border-2 border-[#138489] pt-9 pb-5 px-7 rounded-md mb-4"
        data-aos="fade-right"
        data-aos-delay="600"
      >
        <div className="mb-5 flex items-center gap-3">
          <h1 className="text-white text-xl font-bold">KATEGORI</h1>
          <div className="w-12 h-2 bg-[#22D4EC] rounded-lg" />
        </div>

        <div>
          {data?.Category?.map((item, index) => {
            return (
              <MenuDatasetList
                key={index}
                name={item.Name}
                count={item.DatasetCount}
                href={`/kategori/${item.Slug}`}
              />
            );
          })}
        </div>
        <div className="mt-5 flex justify-center cursor-pointer">
          <Link href={"/kategori"}>
            <MdArrowCircleDown
              size={25}
              color="white"
              className="self-center"
            />
          </Link>
        </div>
      </div>

      {/* TAG */}
      <div
        className="bg-[#043C40] border-solid border-2 border-[#138489] pt-9 pb-5 px-7 rounded-md mb-4"
        data-aos="fade-right"
        data-aos-delay="900"
      >
        <div className="mb-5 flex items-center gap-3">
          <h1 className="text-white text-xl font-bold">TAG</h1>
          <div className="w-12 h-2 bg-[#22D4EC] rounded-lg" />
        </div>
        <div className="flex flex-wrap gap-3">
          {data?.Tag?.map((item, index) => {
            return (
              <BadgeTagMenu
                key={index}
                name={`${item.Name} (${item.DatasetCount})`}
                href={`/tag/${item.Slug}`}
              />
            );
          })}
        </div>
        <div className="mt-5 flex justify-center cursor-pointer">
          <Link href={"/tag"}>
            <MdArrowCircleDown
              size={25}
              color="white"
              className="self-center"
            />
          </Link>
        </div>
      </div>

      {/* FILE */}
      <div
        className="bg-[#043C40] border-solid border-2 border-[#138489] pt-9 pb-5 px-7 rounded-md mb-4"
        data-aos="fade-right"
        data-aos-delay="1200"
      >
        <div className="mb-5 flex items-center gap-3">
          <h1 className="text-white text-xl font-bold">FORMAT</h1>
          <div className="w-12 h-2 bg-[#22D4EC] rounded-lg" />
        </div>
        <div>
          {data?.DatasetType?.map((item, index) => {
            return (
              <MenuDatasetFormatList
                key={index}
                name={item.Name}
                count={item.DatasetCount}
                href={`/format/${item.Slug}`}
              />
            );
          })}
        </div>
        <div className="mt-5 flex justify-center cursor-pointer">
          <Link href={"/format"}>
            <MdArrowCircleDown
              size={25}
              color="white"
              className="self-center"
            />
          </Link>
        </div>
      </div>
    </>
  );
};
