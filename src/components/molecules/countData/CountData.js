import { CountItem } from "@/components/atoms";
import React from "react";

export const CountData = ({
  countSajianData,
  countVisitor,
  countProgramUnggulan,
}) => {
  return (
    <>
      <CountItem
        img={"/assets/icons/ic-kajian-data.svg"}
        width={17}
        height={15}
        alt={"ic-kajian-data.svg"}
        name={"Sajian Data"}
        count={countSajianData}
      />
      <CountItem
        img={"/assets/icons/ic-pengunjung-data.svg"}
        width={16}
        height={12}
        alt={"ic-pengunjung-data.svg"}
        name={"Pengunjung Saat Ini"}
        count={countVisitor}
      />
      <CountItem
        img={"/assets/icons/ic-program-unggulan.svg"}
        width={8}
        height={16}
        alt={"ic-program-unggulan.svg"}
        name={"Data Prioritas"}
        count={countProgramUnggulan}
      />
    </>
  );
};
