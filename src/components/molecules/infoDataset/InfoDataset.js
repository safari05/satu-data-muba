"use client";
import { Button, Container } from "@/components/atoms";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdCalendarMonth, MdCloudDownload, MdArrowBack } from "react-icons/md";

export const InfoDataset = ({ data, isPrivate = false }) => {
  const pathName = usePathname();
  const slug = pathName.split("/").slice(2, 3).join("/");
  var urlBack = `/data/${slug}`;
  if (isPrivate) urlBack = `/data-private/${slug}`;
  return (
    <Container>
      <Link href={urlBack}>
        <div className="flex gap-2 items-center cursor-pointer mb-4">
          <MdArrowBack size={25} color="white" />
          <p className="text-white text-base">Kembali Ke Dataset</p>
        </div>
      </Link>
      <div
        className="bg-[#043C40] border-solid border-2 border-[#138489] p-7 rounded-md mb-4"
        data-aos="fade-right"
      >
        <h1 className="text-white font-bold text-xl font-mono mb-2">
          {data?.DataHeaderName}
        </h1>
        <p className="text-white text-sm mb-1 flex gap-2 items-center">
          <MdCalendarMonth size={15} color="white" />
          (Terakhir Diperbarui : {data?.DataHeaderLastUpdate})
        </p>
        <p
          className="text-white text-base"
          dangerouslySetInnerHTML={{ __html: data?.DatasetDescription }}
        />
        {data?.DatasetType !== "URL Service Spasial" &&
          data?.DataHeaderUrlData !== null && (
            <Button
              bgColor={"bg-[#FF8A00] mt-5"}
              name={"Unduh Data"}
              icon={<MdCloudDownload size={15} color="white" />}
              onClick={() => window.open(data?.DataHeaderUrlData, "_blank")}
            />
          )}
      </div>
    </Container>
  );
};
