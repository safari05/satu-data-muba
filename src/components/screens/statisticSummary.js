"use client";
import { Breadcrumbs, ContentSectoral } from "@/components/organisms";
import { useCountIndicatorFinalQuery, useIndicatorFinalQuery } from "@/hooks";

const StatisticSummaryScreen = ({ initialData }) => {
  const indicatorFinalQuery = useIndicatorFinalQuery(initialData);
  return (
    <>
      <Breadcrumbs name="Statistik Summary" />
      <ContentSectoral data={indicatorFinalQuery} />
    </>
  );
};

export default StatisticSummaryScreen;
