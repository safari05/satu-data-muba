"use client";
import { Select, Spinner } from "@/components/atoms";
import { GlobalContext, setFormGlobal } from "@/context";
import {
  useComboYearsIndicatorFinalQuery,
  useComboSectorAffairsQuery,
  useIndicatorFinalQuery,
} from "@/hooks";
import React, { useContext } from "react";

export const FormSearchSectoral = () => {
  const { dispatch } = useContext(GlobalContext);
  const sectorAffairsQuery = useComboSectorAffairsQuery();
  const yearsQuery = useComboYearsIndicatorFinalQuery();
  const indicatorFinalQuery = useIndicatorFinalQuery();

  return (
    <div className="flex md:flex-nowrap flex-wrap justify-between gap-8 relative mb-8">
      <div
        className="md:w-6/12 w-full grid md:grid-cols-3 grid-cols-1 gap-3"
        data-aos="fade-right"
      >
        <div className="col-span-2">
          <Select
            options={sectorAffairsQuery.data}
            label="Bidang Urusan"
            onChange={(e) => dispatch(setFormGlobal("setSectorAffair", e))}
          />
        </div>
        <Select
          options={yearsQuery.data}
          label="Tahun"
          onChange={(e) => dispatch(setFormGlobal("setYear", e))}
        />
      </div>
      <div className="md:w-6/12 w-full relative">
        <div className="bottom-0 absolute flex w-full gap-3 justify-end">
          {indicatorFinalQuery.isFetching && <Spinner />}
        </div>
      </div>
    </div>
  );
};
