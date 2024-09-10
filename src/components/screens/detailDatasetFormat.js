"use client";
import { useContext, useEffect, useState } from "react";
import { Container, SearchBar } from "../atoms";
import { ContentDataset, PaginationDataset } from "../organisms";
import { GlobalContext } from "@/context";
import { useQueryFormatDataset } from "@/hooks";
import { ProfileFormat } from "../molecules";

const DetailDatasetFormatScreen = ({ initialData, slug }) => {
  const [initData, setInitData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(0);
  const [txtSearch, setTxtSearch] = useState("");
  const { state, dispatch } = useContext(GlobalContext);
  var rq = useQueryFormatDataset(
    slug,
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
      <Container>
        <div className="flex md:flex-nowrap flex-wrap gap-10">
          <div className="w-3/12">
            <ProfileFormat name={initData?.Group?.Name} />
          </div>
          <div className="w-9/12">
            <div className="mb-5">
              <SearchBar
                defaultValue={state.formGlobal.searchDataset}
                onChange={(e) => setTxtSearch(e.target.value)}
                onClick={() =>
                  dispatch(setFormGlobal("searchDataset", txtSearch))
                }
              />
            </div>
            <ContentDataset
              isFetching={rq.isFetching}
              datasets={initData?.Datasets}
            />

            {/* PAGINATION */}
            <PaginationDataset
              setPageIndex={setPageIndex}
              pageIndex={pageIndex}
              pageCount={initData?.TotPage}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default DetailDatasetFormatScreen;
