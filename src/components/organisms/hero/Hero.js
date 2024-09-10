"use client";
import { Container, SearchBar } from "@/components/atoms";
import { CountData } from "@/components/molecules";
import { GlobalContext, setFormGlobal } from "@/context";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export const Hero = ({ data }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [txtSearch, setTxtSearch] = useState("");
  const router = useRouter();
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-8 gap-10">
        {/* COUNT */}
        <div
          className="flex items-center gap-10 order-2 md:order-1"
          data-aos="fade-down"
        >
          <CountData
            countSajianData={data?.DataCount?.Dataset}
            countProgramUnggulan={data?.DataCount?.DatasetPriority}
            countVisitor={data?.DataCount?.Visitor}
          />
        </div>

        {/* SEARCH */}
        <div className="order-1 md:order-2" data-aos="fade-left">
          <SearchBar
            defaultValue={state.formGlobal.searchDataset}
            onChange={(e) => setTxtSearch(e.target.value)}
            onClick={() => {
              dispatch(setFormGlobal("searchDataset", txtSearch));
              router.push("/data");
            }}
          />
        </div>
      </div>
    </Container>
  );
};
