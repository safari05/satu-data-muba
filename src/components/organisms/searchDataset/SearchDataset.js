"use client";
import { Container, SearchBar } from "@/components/atoms";
import { GlobalContext, setFormGlobal } from "@/context";
import React, { useContext, useState } from "react";

export const SearchDataset = ({ totResult }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [txtSearch, setTxtSearch] = useState("");
  return (
    <Container>
      <div className="mb-5" data-aos="fade-down">
        <div className="md:mx-28">
          <SearchBar
            defaultValue={state.formGlobal.searchDataset}
            onChange={(e) => setTxtSearch(e.target.value)}
            onClick={() => dispatch(setFormGlobal("searchDataset", txtSearch))}
          />
        </div>
        <p className="text-white font-bold text-center mt-3 text-xs">
          Tersaji 1 - 10 dari {totResult} Hasil
        </p>
      </div>
    </Container>
  );
};
