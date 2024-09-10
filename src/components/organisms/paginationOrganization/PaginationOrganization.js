"use client";
import { Container } from "@/components/atoms";
import { PaginationNav } from "@/components/molecules";
import { useEffect, useState } from "react";

function PaginationOrganization({ setPageIndex, pageIndex, pageCount }) {
  return (
    <Container>
      <div className="flex gap-3 flex-wrap py-12 justify-end">
        <PaginationNav
          gotoPage={setPageIndex}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          pageCount={pageCount}
          pageIndex={pageIndex}
        />
      </div>
    </Container>
  );
}

export { PaginationOrganization };
