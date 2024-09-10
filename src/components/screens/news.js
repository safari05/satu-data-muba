"use client";
import { useContext, useEffect, useState } from "react";
import { Breadcrumbs, ContentNews, PaginationNews } from "../organisms";
import { GlobalContext } from "@/context";
import { useNewsListQuery } from "@/hooks";

const NewsScreen = ({ initialData }) => {
  const [initData, setInitData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(0);
  const { state } = useContext(GlobalContext);
  const rq = useNewsListQuery(
    state.formGlobal.searchNews,
    pageIndex,
    state.formGlobal.sortNews,
    initData
  );
  useEffect(() => {
    setInitData(rq.data);
  }, [rq.data]);
  useEffect(() => {
    setPageIndex(0);
  }, [state.formGlobal.searchNews]);
  return (
    <>
      <Breadcrumbs name="Berita Satu Data" />

      {/* ORGANIZATION */}
      <ContentNews data={rq} />

      {/* PAGING */}
      <PaginationNews
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        pageCount={initData?.TotPage}
      />
    </>
  );
};

export default NewsScreen;
