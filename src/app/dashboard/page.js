"use client";
import { Container } from "@/components/atoms";
import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DashboardPage() {
  const data = [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380];

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
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
      ],
    },
    colors: [
      "#FF6384", // South Korea
      "#36A2EB", // Canada
      "#FFCE56", // United Kingdom
      "#4BC0C0", // Netherlands
      "#9966FF", // Italy
      "#FF9F40", // France
      "#FF6384", // Japan
      "#36A2EB", // United States
      "#FFCE56", // China
      "#4BC0C0", // Germany
    ],
  };

  return (
    <Container>
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <h1 className="font-semibold text-white">Chart PIE</h1>
        <ReactApexChart
          type="pie"
          width={"100%"}
          height={550}
          series={[44, 55, 41, 17, 15]}
          options={{
            labels: ["IND", "SG", "MY", "MNM", "SSA"],
            plotOptions: {
              pie: {
                startAngle: -90,
                endAngle: 270,
              },
            },
            dataLabels: {
              enabled: true,
            },
            fill: {
              type: "gradient",
            },
            legend: {
              formatter: function (val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex];
              },
            },
            title: {
              text: "Gradient Donut with custom Start-angle",
              style: {
                color: "white",
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          }}
        />
      </div>

      <div>
        <h1>Bar chart</h1>
        <ReactApexChart
          series={[{ name: "Data", data }]}
          options={options}
          type="bar"
          height={350}
        />
      </div>

      <div>
        <h1>Line chart</h1>
        <ReactApexChart
          series={[{ name: "Data", data }]}
          options={options}
          type="bar"
          height={350}
        />
      </div>
    </Container>
  );
}
