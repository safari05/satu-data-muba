"use client";
import { ImageFallback, Spinner } from "@/components/atoms";
import { DatasetList } from "@/components/molecules";
import { GlobalContext, setFormGlobal } from "@/context";
import React, { useContext } from "react";

export const ContentDataset = ({ isFetching, datasets, sorts }) => {
  const { dispatch } = useContext(GlobalContext);
  return (
    <>
      <div className="flex items-center justify-between" data-aos="zoom-in">
        <div className="flex items-center gap-4">
          <h1 className="text-[#22D4EC] font-bold text-lg">Semua Dataset :</h1>
          {isFetching && <Spinner />}
        </div>
        <select
          className="border-solid border-[0.7px] border-slate-400 p-2 text-xs rounded-md"
          onChange={(e) =>
            dispatch(setFormGlobal("sortDataset", e.target.value))
          }
        >
          <option value="">Sortir Berdasarkan</option>
          <option value="1">Sort (Judul) ASC - DESC</option>
          <option value="2">Sort (Judul) DESC - ASC</option>
          <option value="3">Sort (Tgl. Publish) ASC - DESC</option>
          <option value="4">Sort (Tgl. Publish) DESC - ASC</option>
        </select>
      </div>

      <div className="max-h-full overflow-x-hidden">
        {datasets?.map((item, index) => {
          return (
            <div
              key={index}
              data-aos="fade-left"
              data-aos-delay={250 * index++}
            >
              <DatasetList
                img={item.DatasetOpdLogo}
                title={item.DataHeaderName}
                desc={item.DatasetDescription}
                tags={item.Tags}
                href={`/data/${item.DataHeaderSlug}`}
              />
            </div>
          );
        })}
        {datasets?.length === 0 && (
          <center>
            <ImageFallback
              src={"/assets/svg/ilus-empty-dataset.svg"}
              alt="empty-dataset"
              width={300}
              height={285}
              className="w-[300px] h-[285px] object-contain rounded-md my-16"
              fallbackSrc={"/assets/svg/ilus-empty-dataset.svg"}
            />
            <h1 className="text-white">Ups, sepertinya tidak ada dataset!</h1>
          </center>
        )}
      </div>
    </>
  );
};
