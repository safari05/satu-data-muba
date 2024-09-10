"use client";
import { useContext, useEffect, useState } from "react";
import {
  Breadcrumbs,
  ContentInfoGrafis,
  PaginationNews,
} from "@/components/organisms";
import { GlobalContext } from "@/context";
import { useInfoGraphicListQuery } from "@/hooks";

const InfoGraphicScreen = ({ initialData }) => {
  const [initData, setInitData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(0);
  const { state } = useContext(GlobalContext);

  var rq = useInfoGraphicListQuery(
    state.formGlobal.searchInfoGraphic,
    pageIndex,
    state.formGlobal.sortInfoGraphic,
    initData
  );

  useEffect(() => {
    setInitData(rq.data);
  }, [rq.data]);
  useEffect(() => {
    setPageIndex(0);
  }, [state.formGlobal.searchInfoGraphic]);
  return (
    <>
      {/* BREADCRUMBS */}
      <Breadcrumbs name="Info Grafis" />

      {/* CONTENT */}
      <ContentInfoGrafis data={rq} />

      {/* PAGING */}
      <PaginationNews
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        pageCount={initData?.TotPage}
      />
    </>
  );
};

export default InfoGraphicScreen;
