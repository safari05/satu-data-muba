"use client";
import { ButtonTab, Container, Spinner } from "@/components/atoms";
import { DataTable } from "@/components/molecules";
import React, { useEffect } from "react";
import { useState } from "react";

export const ContentPublication = ({ data }) => {
  const [dataTable, setDataTable] = useState([]);
  useEffect(() => {
    if (data.data) setDataTable(data?.data[0]?.Files);
  }, [data]);

  return (
    <Container>
      <div data-aos="fade-left">
        <div className="flex items-start">
          <div className="grid grid-cols-4 pb-1">
            {data?.data?.map((item, index) => {
              var classnames = "";
              if (index === 0)
                classnames =
                  "bg-[#00829E] rounded-t-md cursor-pointer px-6 py-2 z-[4] text-center";
              if (index === 1)
                classnames =
                  "bg-[#0D9AB9] rounded-tr-md -ml-1 cursor-pointer px-6 py-2 z-[3] text-center";
              if (index === 2)
                classnames =
                  "bg-[#1CB3D4] rounded-tr-md -ml-1 cursor-pointer px-6 py-2 z-[2] text-center";
              if (index === 3)
                classnames =
                  "bg-[#17859e] rounded-tr-md -ml-1 cursor-pointer px-6 py-2 text-center";
              return (
                <ButtonTab
                  key={index}
                  className={classnames}
                  onClick={() => {
                    setDataTable(item.Files);
                  }}
                  name={item.Type}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="bg-[#043C40] border-solid border-2 border-[#138489] p-6 rounded-r-md rounded-b-md mb-4 -mt-1"
        data-aos="fade-up"
      >
        {data?.isFetching && <Spinner />}
        <DataTable data={dataTable} column={jsonColumn} />
      </div>
    </Container>
  );
};

const jsonColumn = [
  {
    name: "Number",
    header: "NO",
    selector: (row) => row.getValue(),
  },
  {
    name: "Title",
    header: "NAMA",
    selector: (row) => row.getValue(),
  },
  {
    name: "UrlFile",
    header: "AKSI",
    selector: (row) => (
      <div
        className="text-[#00829E] cursor-pointer"
        onClick={() => window.open(row.getValue(), "_blank")}
      >
        Lihat
      </div>
    ),
  },
];
