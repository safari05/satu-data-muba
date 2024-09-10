"use client";
import { useContext, useEffect, useState } from "react";
import {
  Breadcrumbs,
  ContentCategory,
  PaginationCategory,
} from "@/components/organisms";
import { GlobalContext } from "@/context";
import { useDatasetCategoryQuery } from "@/hooks";

const CategoryScreen = ({ initialData }) => {
  const [initData, setInitData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(0);
  const { state } = useContext(GlobalContext);
  const rq = useDatasetCategoryQuery(
    state.formGlobal.searchCategory,
    pageIndex,
    state.formGlobal.sortCategory,
    initData
  );
  useEffect(() => {
    setInitData(rq.data);
  }, [rq.data]);
  useEffect(() => {
    setPageIndex(0);
  }, [state.formGlobal.searchCategory]);
  return (
    <>
      {/* BREADCRUMBS */}
      <Breadcrumbs name="KATEGORI" />

      {/* ORGANIZATION */}
      <ContentCategory data={rq} />

      {/* PAGING */}
      <PaginationCategory
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        pageCount={initData?.TotPage}
      />
    </>
  );
};

export default CategoryScreen;
