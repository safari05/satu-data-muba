"use client";
import { Container } from "@/components/atoms";
import React from "react";
import { MenuDataset } from "../menuDataset";
import { ContentDataset } from "../contentDataset";
import { PaginationDataset } from "../paginationDataset";

export const Dataset = ({ data, setPageIndex, pageIndex, initialInfo }) => {
  const { data: dataDataset, isLoading, isFetching, error } = data;
  return (
    <Container>
      <div className="flex md:flex-nowrap flex-wrap gap-10">
        <div className="md:w-3/12 order-2 md:order-1">
          <MenuDataset initialData={initialInfo} />
        </div>
        <div className="md:w-9/12 order-1 md:order-2">
          <ContentDataset
            isFetching={isFetching}
            datasets={dataDataset?.Datasets}
          />

          {/* PAGINATION */}
          <PaginationDataset
            setPageIndex={setPageIndex}
            pageIndex={pageIndex}
            pageCount={dataDataset?.TotPage}
          />
        </div>
      </div>
    </Container>
  );
};
