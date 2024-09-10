"use client";
import { Container, SearchBar, Spinner } from "@/components/atoms";
import { OrganizationList } from "@/components/molecules";
import { GlobalContext, setFormGlobal } from "@/context";
import { useContext, useState } from "react";

export const ContentCategory = ({ data }) => {
  const { data: dataCategory, isLoading, isFetching, error } = data;
  const { state, dispatch } = useContext(GlobalContext);
  const [txtSearch, setTxtSearch] = useState("");
  return (
    <Container>
      <h3 className="text-white font-bold text-xl mb-3" data-aos="fade-right">
        Telusuri Berdasarkan{" "}
        <span className="font-normal underline text-white">Kategori</span>
      </h3>
      <div className="mb-10" data-aos="fade-left">
        <div className="mb-3">
          <SearchBar
            defaultValue={state.formGlobal.searchCategory}
            onChange={(e) => setTxtSearch(e.target.value)}
            onClick={() => dispatch(setFormGlobal("searchCategory", txtSearch))}
          />
        </div>
        <div className="flex items-center justify-between" data-aos="zoom-in">
          <div className="flex items-center gap-4">
            <h1 className="text-[#22D4EC] font-bold text-lg">
              Tersaji 1 - {dataCategory?.Datasets?.length} dari{" "}
              {dataCategory.TotResult} Hasil :
            </h1>
            {isFetching && <Spinner />}
          </div>
          <select
            className="border-solid border-[0.7px] border-slate-400 p-2 text-xs rounded-md"
            onChange={(e) =>
              dispatch(setFormGlobal("sortOrganization", e.target.value))
            }
          >
            <option value="">Sortir Berdasarkan</option>
            <option value="1">Sort (Nama OPD) ASC - DESC</option>
            <option value="2">Sort (Nama OPD) DESC - ASC</option>
            <option value="3">Sort (Tgl. OPD) ASC - DESC</option>
            <option value="4">Sort (Tgl. OPD) DESC - ASC</option>
          </select>
        </div>
      </div>
      <div
        className="grid md:grid-cols-3 gap-10 grid-cols-1"
        data-aos="fade-up"
      >
        {dataCategory?.Datasets?.map((item, index) => {
          return (
            <div key={index} data-aos="fade-up" data-aos-delay={250 * index++}>
              <OrganizationList
                img={item.FileLogo}
                alt={`category-${index++}`}
                count={item.DatasetCount}
                opd={item.Name}
                desc={item.Description}
                href={`kategori/${item.Slug}`}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
