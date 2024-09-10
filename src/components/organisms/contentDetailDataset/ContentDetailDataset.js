"use client";
import { BadgeTagMenu, Button, ButtonTab } from "@/components/atoms";
import {
  DatasetMoreList,
  MetadataList,
  MetafieldHeader,
  MetafieldList,
  TitleDescDataset,
} from "@/components/molecules";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdCloudDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import XMLViewer from "react-xml-viewer";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@/components/material-tailwind";
import { FaMinus, FaPlus } from "react-icons/fa";

const themeXml = {
  attributeKeyColor: "#0074D9",
  attributeValueColor: "#2ECC40",
};
export const ContentDetailDataset = ({ data, isPrivate = false }) => {
  const pathName = usePathname();
  const slug = pathName.split("/").slice(2).join("/");
  const [numTab, setNumTab] = useState(1);
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  var labelTabDynamic = data?.DatasetType === "Excel" ? "Field" : "Spasial";
  return (
    <>
      {/* OPD DESC */}
      <div className="mb-8">
        <TitleDescDataset
          title={data?.DataHeaderName}
          desc={data?.DatasetDescription}
        />
      </div>

      {/* GROUP TAB */}
      <div className="mb-8" data-aos="fade-left">
        <div className="flex items-start">
          <div className="grid grid-cols-3 pb-1">
            <ButtonTab
              className="bg-[#00829E] rounded-t-md cursor-pointer px-3 py-2 z-[3] text-center"
              onClick={() => setNumTab(1)}
              name={"Additional Info"}
            />
            {data?.Tags?.length > 0 && (
              <ButtonTab
                className="bg-[#0D9AB9] rounded-tr-md -ml-1 cursor-pointer px-3 py-2 z-[2] text-center"
                onClick={() => setNumTab(2)}
                name={"Tag"}
              />
            )}
            {data?.DatasetType !== "GeoJson" &&
              data?.DatasetType !== "Dokumen (PDF)" && (
                <ButtonTab
                  className="bg-[#1CB3D4] rounded-tr-md -ml-1 cursor-pointer px-3 py-2 text-center"
                  onClick={() => setNumTab(3)}
                  name={labelTabDynamic}
                />
              )}
          </div>
        </div>
        <div className="border-solid border-[0.7px] border-[#0F9199] p-4 rounded-md -mt-1">
          {numTab === 1 && (
            <div>
              <MetadataList
                label={"Nama Meta Data"}
                value={data?.MetadataName}
              />
              <MetadataList
                label={"Terakhir Diperbarui"}
                value={data?.DataHeaderLastUpdate}
              />
              <MetadataList label={"Dibuat"} value={data?.DatasetCreatedDate} />
              <MetadataList label={"Tipe Dataset"} value={data?.DatasetType} />
              <MetadataList label={"Sumber"} value={data?.DataSource} />
              <MetadataList
                label={"Frekuensi Penerbitan"}
                value={data?.Frequency}
              />
              <MetadataList label={"Tahun"} value={data?.Year} />
              <MetadataList label={"Periode"} value={data?.Period} />
              <MetadataList label={"Lisensi"} value={data?.License} />
            </div>
          )}

          {numTab === 2 && (
            <div className="flex gap-4 flex-wrap">
              {data?.Tags.map((item, index) => {
                return (
                  <BadgeTagMenu
                    key={index}
                    name={item.Name}
                    href={`/tag/${item.Slug}`}
                  />
                );
              })}
            </div>
          )}

          {numTab === 3 && (
            <div className="overflow-x-scroll min-w-[200px] max-w-[450px] md:max-w-none">
              {data?.DatasetType === "Excel" && (
                <>
                  <MetafieldHeader />
                  {data?.Fields.map((item, index) => {
                    return (
                      <MetafieldList
                        key={index}
                        name={item.Name}
                        title={item.Title}
                        desc={item.Description}
                        type={item.FieldType}
                      />
                    );
                  })}
                </>
              )}

              {data?.GeoportalType === "arcgisserver" && (
                <>
                  <Accordion open={open === 1} className="mb-3">
                    <AccordionHeader
                      className="border-solid border-[1px] px-3 rounded-md"
                      onClick={() => handleOpen(1)}
                    >
                      <div className="flex justify-between w-full items-center">
                        <p className="text-sm font-semibold text-white hover:text-[#1CB3D4]">
                          Format XML
                        </p>
                        {open === 1 ? (
                          <FaMinus size={15} color="white" />
                        ) : (
                          <FaPlus size={15} color="white" />
                        )}
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <pre className="bg-white p-3 mx-3 rounded-sm max-h-80 overflow-scroll">
                        <XMLViewer
                          xml={data?.StaticArcgis?.metadataXml}
                          theme={themeXml}
                        />
                      </pre>
                    </AccordionBody>
                  </Accordion>
                  {data?.StaticArcgis?.meta?.map((item, index) => {
                    var no = index + 2;
                    return (
                      <Accordion
                        key={index}
                        open={open === no}
                        className="mb-3"
                      >
                        <AccordionHeader
                          className="border-solid border-[1px] px-3 rounded-md"
                          onClick={() => handleOpen(no)}
                        >
                          <div className="flex justify-between w-full items-center">
                            <p className="text-sm font-semibold text-white hover:text-[#1CB3D4]">
                              {item.title}
                            </p>
                            {open === 1 ? (
                              <FaMinus size={15} color="white" />
                            ) : (
                              <FaPlus size={15} color="white" />
                            )}
                          </div>
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="border-solid border-[0.7px] border-[#0F9199] p-4 rounded-md -mt-1">
                            {item.data?.map((itemx, indexx) => {
                              return (
                                <MetadataList
                                  key={indexx}
                                  label={itemx.title}
                                  value={itemx.value}
                                />
                              );
                            })}
                          </div>
                        </AccordionBody>
                      </Accordion>
                    );
                  })}
                </>
              )}

              {data?.GeoportalType === "geoserver" && (
                <>
                  <Accordion open={open === 1} className="mb-3">
                    <AccordionHeader
                      className="border-solid border-[1px] px-3 rounded-md"
                      onClick={() => handleOpen(1)}
                    >
                      <div className="flex justify-between w-full items-center">
                        <p className="text-sm font-semibold text-white hover:text-[#1CB3D4]">
                          Format XML
                        </p>
                        {open === 1 ? (
                          <FaMinus size={15} color="white" />
                        ) : (
                          <FaPlus size={15} color="white" />
                        )}
                      </div>
                    </AccordionHeader>
                    <AccordionBody>
                      <pre className="bg-white p-3 mx-3 rounded-sm max-h-80 overflow-scroll">
                        <XMLViewer
                          xml={data?.StaticGeoserver?.metadataXml}
                          theme={themeXml}
                        />
                      </pre>
                    </AccordionBody>
                  </Accordion>
                  {data?.StaticGeoserver?.meta?.map((item, index) => {
                    var no = index + 2;
                    return (
                      <Accordion
                        key={index}
                        open={open === no}
                        className="mb-3"
                      >
                        <AccordionHeader
                          className="border-solid border-[1px] px-3 rounded-md"
                          onClick={() => handleOpen(no)}
                        >
                          <div className="flex justify-between w-full items-center">
                            <p className="text-sm font-semibold text-white hover:text-[#1CB3D4]">
                              {item.title}
                            </p>
                            {open === 1 ? (
                              <FaMinus size={15} color="white" />
                            ) : (
                              <FaPlus size={15} color="white" />
                            )}
                          </div>
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="border-solid border-[0.7px] border-[#0F9199] p-4 rounded-md -mt-1">
                            {item.data?.map((itemx, indexx) => {
                              return (
                                <MetadataList
                                  key={indexx}
                                  label={itemx.title}
                                  value={itemx.value}
                                />
                              );
                            })}
                          </div>
                        </AccordionBody>
                      </Accordion>
                    );
                  })}
                </>
              )}

              {data?.DatasetType === "File SHP (ZIP)" && (
                <Accordion open={open === 1} className="mb-3">
                  <AccordionHeader
                    className="border-solid border-[1px] px-3 rounded-md"
                    onClick={() => handleOpen(1)}
                  >
                    <div className="flex justify-between w-full items-center">
                      <p className="text-sm font-semibold text-white hover:text-[#1CB3D4]">
                        Format XML
                      </p>
                      {open === 1 ? (
                        <FaMinus size={15} color="white" />
                      ) : (
                        <FaPlus size={15} color="white" />
                      )}
                    </div>
                  </AccordionHeader>
                  <AccordionBody>
                    <pre className="bg-white p-3 mx-3 rounded-sm">
                      {data?.StaticShp?.metadataXml && (
                        <XMLViewer
                          xml={data?.StaticShp?.metadataXml}
                          theme={themeXml}
                        />
                      )}
                    </pre>
                  </AccordionBody>
                </Accordion>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BUTTON SHOW UNDUH */}
      <div className="flex items-start gap-3 mb-8" data-aos="fade-up">
        <Button
          name={"Lihat Data"}
          bgColor={"bg-[#FF0000]"}
          icon={<MdOutlineRemoveRedEye size={15} color="white" />}
          isLink
          href={`/${!isPrivate ? "data" : "data-private"}/${slug}/preview`}
        />
        {data?.DatasetType !== "URL Service Spasial" &&
          data?.DataHeaderUrlData !== null && (
            <Button
              name={"Unduh"}
              bgColor={"bg-[#FF8A00]"}
              icon={<MdCloudDownload size={15} color="white" />}
              onClick={() => window.open(data?.DataHeaderUrlData, "_blank")}
            />
          )}
      </div>

      {/* LIST MORE OPD */}
      <div>
        <h1
          className="text-white text-lg font-bold font-mono mb-5"
          data-aos="fade-in"
        >
          Data dengan kategori yang sama
        </h1>
        {data?.SimilarDatasets?.map((item, index) => {
          return (
            <div key={index} data-aos="fade-left">
              <DatasetMoreList
                key={index}
                title={item.DataHeaderName}
                desc={item.DatasetDescription}
                href={`/data/${item.DatasetSlug}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
