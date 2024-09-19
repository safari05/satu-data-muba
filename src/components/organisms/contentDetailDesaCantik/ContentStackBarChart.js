import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ContentStackBarChart = ({ labels = [], dataSeries = [], background = [] }) => {
  if (
    !Array.isArray(labels) ||
    !Array.isArray(dataSeries) ||
    labels.length === 0 ||
    dataSeries.length === 0
  ) {
    console.error("Invalid data provided:", { labels, dataSeries });
    return null;
  }

  const transformData = (dataStackBarSeries) => {
    return dataStackBarSeries.map((desil) => {
      return {
        name: desil.Name,
        data: desil.Data.map((item) => item.Value),
      };
    });
  };

  const series = transformData(dataSeries);
  
  const colors = background;

  const options = {
    chart: {
        type: "bar",
        height: 1000,
        stacked: true,
      },
      fill: {
        opacity: 1
      },
    responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
    plotOptions: {
      bar: {
        columnWidth: '100%',
        responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels,
      labels: {
        offsetX: -10
      }
    },
    colors : colors
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ContentStackBarChart;
