"use client";
import { Breadcrumbs, ContentSectoral } from "@/components/organisms";
import { useCountIndicatorFinalQuery, useIndicatorFinalQuery } from "@/hooks";

const StatisticSectoralScreen = ({ initialData }) => {
  const indicatorFinalQuery = useIndicatorFinalQuery(initialData);
  return (
    <>
      <Breadcrumbs name="Statistik Sektoral" />
      <ContentSectoral data={indicatorFinalQuery} />
    </>
  );
};

export default StatisticSectoralScreen;
