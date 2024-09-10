"use client";
import { ButtonPagination } from "@/components/atoms";
import { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const PaginationNav = ({
  gotoPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
}) => {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const btnGotoPage = (val) => {
    scrollToTop();
    gotoPage(val);
  };

  const renderPageLinks = useCallback(() => {
    if (pageCount === 0) return null;
    const visiblePageButtonCount = 3;
    let numberOfButtons =
      pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
    const pageIndices = [pageIndex];
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 0 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
    return pageIndices.map((pageIndexToMap) => (
      <li key={pageIndexToMap}>
        <ButtonPagination
          content={pageIndexToMap + 1}
          onClick={() => btnGotoPage(pageIndexToMap)}
          active={pageIndex === pageIndexToMap}
        />
      </li>
    ));
  }, [pageCount, pageIndex]);
  return (
    <ul className="flex gap-2">
      <li>
        <ButtonPagination
          content={
            <div className="flex ml-1">
              <FaChevronLeft size={6} color="white" />
              <FaChevronLeft
                size={6}
                color="white"
                className="-translate-x-1/2"
              />
            </div>
          }
          onClick={() => btnGotoPage(0)}
          disabled={!canPreviousPage}
        />
      </li>
      {renderPageLinks()}
      <li>
        <ButtonPagination
          content={
            <div className="flex ml-1">
              <FaChevronRight size={6} color="white" />
              <FaChevronRight
                size={6}
                color="white"
                className="-translate-x-1/2"
              />
            </div>
          }
          onClick={() => btnGotoPage(pageCount - 1)}
          disabled={!canNextPage}
        />
      </li>
    </ul>
  );
};
