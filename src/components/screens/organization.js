"use client";
import {
  Breadcrumbs,
  ContentOrganization,
  PaginationOrganization,
} from "@/components/organisms";
import { GlobalContext } from "@/context";
import { useDatasetAgencyQuery } from "@/hooks";
import { useContext, useEffect, useState } from "react";

const OrganizationScreen = ({ initialData }) => {
  const [initData, setInitData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(0);
  const { state } = useContext(GlobalContext);
  var rq = useDatasetAgencyQuery(
    state.formGlobal.searchOrganization,
    pageIndex,
    state.formGlobal.sortOrganization,
    initData
  );
  useEffect(() => {
    setInitData(rq.data);
  }, [rq.data]);
  useEffect(() => {
    setPageIndex(0);
  }, [state.formGlobal.searchOrganization]);
  return (
    <>
      {/* BREADCRUMBS */}
      <Breadcrumbs name="Organisasi" />

      {/* ORGANIZATION */}
      <ContentOrganization data={rq} />

      {/* PAGING */}
      <PaginationOrganization
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        pageCount={initData?.TotPage}
      />
    </>
  );
};

export default OrganizationScreen;
