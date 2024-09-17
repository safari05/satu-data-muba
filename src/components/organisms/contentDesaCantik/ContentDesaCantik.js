"use client";
import React from "react";
import { Container } from "@/components/atoms";
import ContentSwiper from "./ContentSwiper";



export const ContentDesaCantik = (dataDesaCantik) => {

  if (!dataDesaCantik || !dataDesaCantik.dataDesaCantik) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <div
        className="flex flex-col items-center justify-center"
        data-aos="fade-up"
      >
        <h2 className="font-bold text-center text-green-500 text-2xl">
          DESA CANTIK
        </h2>
        <h3
          className="text-center text-white font-bold text-xl mb-3"
          data-aos="fade-right"
        >
          Kab.
          <span className="font-normal text-yellow-200 uppercase">
            Musi Banyuasin
          </span>
        </h3>
      </div>

      <div className="mb-10">
        <h1 className="text-yellow-400 font-bold text-xl">
          {dataDesaCantik.dataDesaCantik.Data.Kuisioner.Judul}
        </h1>
        <div className="mt-4">
          <ContentSwiper data={dataDesaCantik.dataDesaCantik.Data.Kuisioner.Items} isKuisioner={true}/>
        </div>
      </div>

      <div>
        <h1 className="text-white font-bold text-xl">{dataDesaCantik.dataDesaCantik.Data.Survey.Judul}</h1>
        <div className="mt-4">
          <ContentSwiper data={dataDesaCantik.dataDesaCantik.Data.Survey.Items} isKuisioner={false}/>
        </div>
      </div>
    </Container>
  );
};

