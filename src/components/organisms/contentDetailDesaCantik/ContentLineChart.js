import React from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ContentLineChart = ({ title, labels = [], dataSeries = [], background = [] }) => {
  if (
    !Array.isArray(labels) ||
    !Array.isArray(dataSeries) ||
    labels.length === 0 ||
    dataSeries.length === 0 ||
    background.length === 0
  ) {
    console.error("Invalid data provided:", { labels, dataSeries });
    return null;
  }

  const validDataSeries = dataSeries.map((num) => (typeof num === "number" ? num : 0));

  // Prepare series with different colors for each segment
  const series = [
    {
      name: title,
      data: validDataSeries,
      colors: background, 
    },
  ];

  const options = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
        tools: {
          download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`,
        },
      },
      export: {
        csv: {
          filename: 'chart_data',
          columnDelimiter: ',',
          headerCategory: 'Category',
          headerValue: 'Value',
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth", // Change to "straight" if preferred
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // Takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: labels,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: background,
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      }
  };

  return (
    <div className="w-full">
      <ReactApexChart type="line" options={options} series={series}  height={350} />
    </div>
  );
};

ContentLineChart.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataSeries: PropTypes.arrayOf(PropTypes.number).isRequired,
  background: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ContentLineChart;
