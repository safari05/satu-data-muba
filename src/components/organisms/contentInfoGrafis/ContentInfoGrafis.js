"use client";
import { Container, SearchBar, Spinner } from "@/components/atoms";
import { InfoGrafisList } from "@/components/molecules";
import { GlobalContext, setFormGlobal } from "@/context";
import { useContext, useState } from "react";

export const ContentInfoGrafis = ({ data }) => {
  const { data: dataInfoGraphics, isLoading, isFetching, error } = data;
  const { state, dispatch } = useContext(GlobalContext);
  const [txtSearch, setTxtSearch] = useState("");
  return (
    <Container>
      <h3 className="text-white font-bold text-xl mb-3" data-aos="fade-right">
        Telusuri Tentang{" "}
        <span className="font-normal underline text-white">Info Grafis</span>
      </h3>
      <div className="mb-10" data-aos="fade-left">
        <div className="mb-3">
          <SearchBar
            defaultValue={state.formGlobal.searchInfoGraphic}
            onChange={(e) => setTxtSearch(e.target.value)}
            onClick={() =>
              dispatch(setFormGlobal("searchInfoGraphic", txtSearch))
            }
          />
        </div>
        <div className="flex items-center justify-between" data-aos="zoom-in">
          <div className="flex items-center gap-4">
            <h1 className="text-[#22D4EC] font-bold text-lg">
              Tersaji 1 - {dataInfoGraphics?.Infographics?.length} dari{" "}
              {dataInfoGraphics.length} Hasil :
            </h1>
            {isFetching && <Spinner />}
          </div>
          <select
            className="border-solid border-[0.7px] border-slate-400 p-2 text-xs rounded-md"
            onChange={(e) =>
              dispatch(setFormGlobal("sortInfoGraphic", e.target.value))
            }
          >
            <option value="">Sortir Berdasarkan</option>
            <option value="1">Sort (Judul) ASC - DESC</option>
            <option value="2">Sort (Judul) DESC - ASC</option>
            <option value="3">Sort (Tgl. Posting) ASC - DESC</option>
            <option value="4">Sort (Tgl. Posting) DESC - ASC</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {dataInfoGraphics?.Infographics?.map((item, index) => {
          return (
            <div key={index} data-aos="fade-up" data-aos-delay={250 * index++}>
              <InfoGrafisList
                title={item.Title}
                desc={item.Description}
                img={item.UrlThumbnail}
                date={item.CreatedDate}
                link={`/info-grafis/${item.Slug}`}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
