"use client";
import React from "react";
import {
  BannerNews,
  BrandOpd,
  DatasetRank,
  Hero,
  LatestNews,
} from "../organisms";
import { useHomeQuery } from "@/hooks";

const HomeScreen = ({ initialData }) => {
  const { data } = useHomeQuery(initialData);
  return (
    <>
      {/* HERO */}
      <Hero data={data} />

      {/* BANNER */}
      <BannerNews data={data} />

      {/* BRAND */}
      <BrandOpd data={data} />

      {/* DATASET */}
      <DatasetRank data={data} />

      {/* NEWS */}
      <LatestNews data={data} />
    </>
  );
};

export default HomeScreen;
