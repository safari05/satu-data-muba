import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ContentBarChart = ({
  labels = [],
  dataSeries = [],
  background = [],
}) => {
  if (
    !Array.isArray(labels) ||
    !Array.isArray(dataSeries) ||
    labels.length === 0 ||
    dataSeries.length === 0
  ) {
    console.error("Invalid data provided:", { labels, dataSeries });
    return null;
  }

  const validBackground = Array.isArray(background) ? background : [];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: labels,
    },
    colors: validBackground,
  };

  return (
    <div className="w-full">
      <ReactApexChart
        series={[{ name: "Data", data: dataSeries }]}
        options={options}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ContentBarChart;