import { useCountIndicatorFinalQuery } from "@/hooks";
import React from "react";

export const WidgetCountSectoral = () => {
  const countIndicatorFinalQuery = useCountIndicatorFinalQuery();
  return (
    <div
      className="bg-[#043C40] border-solid border-2 border-[#138489] p-6 rounded-md mb-4"
      data-aos="fade-up"
    >
      <div className="flex justify-between items-center">
        <div className="w-4/12">
          <h1 className="text-white font-semibold"> Total Data :</h1>
        </div>
        <div className="w-8/12 flex gap-5 justify-end">
          {countIndicatorFinalQuery.data?.map((item, index) => {
            return (
              <div className="flex gap-3 items-center" key={index}>
                <h1 className="text-white font-semibold">
                  Tahun {item.tahun} :{" "}
                </h1>
                <p className="bg-[#138489] rounded-md px-2 py-1  text-sm font-bold text-white">
                  {item.count}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
