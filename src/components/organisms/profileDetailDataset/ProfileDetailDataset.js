"use client";
import { SearchBar } from "@/components/atoms";
import { InfoSupport, ProfileOpd } from "@/components/molecules";
import { GlobalContext, setFormGlobal } from "@/context";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export const ProfileDetailDataset = ({ data }) => {
  const [txtSearch, setTxtSearch] = useState("");
  const { state, dispatch } = useContext(GlobalContext);
  const router = useRouter();
  return (
    <>
      {/* PROFILE OPD */}
      <div className="mb-4" data-aos="fade-right">
        <ProfileOpd
          img={data?.Agency?.FileLogo}
          opd={data?.Agency?.Name}
          desc={data?.Agency?.Description}
        />
      </div>

      {/* SEARCH */}
      <div className="mb-4" data-aos="zoom-in">
        <SearchBar
          defaultValue={state.formGlobal.searchDataset}
          onChange={(e) => setTxtSearch(e.target.value)}
          onClick={() => {
            dispatch(setFormGlobal("searchDataset", txtSearch));
            router.push("/data");
          }}
        />
      </div>

      {/* INFORMATION */}
      <div data-aos="flip-right">
        <InfoSupport telp={"0714-321-021"} mail={"info@satudata.muba.go.id"} />
      </div>
    </>
  );
};
