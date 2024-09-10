"use client";
import { ContentDataset, PaginationDataset } from "../organisms";
import { Container, SearchBar } from "../atoms";
import { ProfileOrganization } from "../molecules";
import { useContext, useEffect, useState } from "react";
import { GlobalContext, setFormGlobal } from "@/context";
import { useDatasetAgencyDatasetQuery } from "@/hooks";

const DetailOrganizationScreen = ({ initialData, slug }) => {
  const [initData, setInitData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(0);
  const [txtSearch, setTxtSearch] = useState("");
  const { state, dispatch } = useContext(GlobalContext);
  var rq = useDatasetAgencyDatasetQuery(
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
    <Container>
      <div className="flex md:flex-nowrap flex-wrap gap-10">
        <div className="md:w-3/12 w-full">
          <ProfileOrganization
            img={initData?.Group.FileLogo}
            opd={initData?.Group.Name}
            desc={initData?.Group.Description}
            totDataset={initData?.TotResult}
          />
        </div>
        <div className="md:w-9/12 w-full">
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
  );
};

export default DetailOrganizationScreen;
