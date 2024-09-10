"use client";
import React, { useContext, useState, useEffect } from "react";
import { Dataset, SearchDataset } from "../organisms";
import { GlobalContext } from "@/context";
import { useDatasetsQuery } from "@/hooks";

const DatasetScreen = ({ initialDataset, initialInfo }) => {
  const [initData, setInitData] = useState(initialDataset);
  const [pageIndex, setPageIndex] = useState(0);
  const { state } = useContext(GlobalContext);
  var rq = useDatasetsQuery(
    state.formGlobal.searchDataset,
    pageIndex,
    state.formGlobal.sortDataset,
    initData
  );
  useEffect(() => {
    setInitData(rq.data);
  }, [rq.data]);
  useEffect(() => {
    setPageIndex(0);
  }, [state.formGlobal.searchDataset]);

  return (
    <>
      {/* SEARCH */}
      <SearchDataset totResult={initData.TotResult} />

      {/* CONTENT */}
      <Dataset
        data={rq}
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        initialInfo={initialInfo}
      />
    </>
  );
};

export default DatasetScreen;
