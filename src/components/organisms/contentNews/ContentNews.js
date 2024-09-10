"use client";
import React, { useContext, useState } from "react";
import { Container, SearchBar, Spinner } from "@/components/atoms";
import { NewsList } from "@/components/molecules";
import { GlobalContext, setFormGlobal } from "@/context";

export const ContentNews = ({ data }) => {
  const { data: dataNews, isLoading, isFetching, error } = data;
  const { state, dispatch } = useContext(GlobalContext);
  const [txtSearch, setTxtSearch] = useState("");
  return (
    <Container>
      <div className="mb-10" data-aos="fade-left">
        <div className="mb-3">
          <SearchBar
            defaultValue={txtSearch}
            onChange={(e) => setTxtSearch(e.target.value)}
            onClick={() => dispatch(setFormGlobal("searchNews", txtSearch))}
          />
        </div>
        <div className="flex items-center justify-between" data-aos="zoom-in">
          <div className="flex items-center gap-4">
            <h1 className="text-[#22D4EC] font-bold text-lg">
              Tersaji 1 - {dataNews?.News?.length} dari {dataNews.TotResult}{" "}
              Hasil :
            </h1>
            {isFetching && <Spinner />}
          </div>
          <select
            className="border-solid border-[0.7px] border-slate-400 p-2 text-xs rounded-md"
            onChange={(e) =>
              dispatch(setFormGlobal("sortNews", e.target.value))
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
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {dataNews?.News?.map((item, index) => {
          return (
            <div key={index} data-aos="fade-up" data-aos-delay={250 * index++}>
              <NewsList
                no={item.Number}
                type={item.Type}
                img={item?.FileName}
                alt={item?.Title}
                title={item.Title}
                desc={item.Description}
                lastUpdate={item.LastUpdate}
                href={`/berita/${item.Slug}`}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
