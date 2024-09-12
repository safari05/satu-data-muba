"use client";
import { Container, Select } from "@/components/atoms";
import RSelect from "react-select";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ContentChart from "./ContentChart";
import { useEffect, useState } from "react";
import datasetService from "@/services/dataset.service";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '200px', // Set your desired width here
  }),
  control: (provided) => ({
    ...provided,
    minWidth: '200px', // Ensure the control itself has the minimum width
  }),
};

export const ContentDetailDesaCantik = ({data, isKuisioner}) => {
  console.log(isKuisioner)
  const[chartPeriode, setChartPeriode] = useState(data.Data.ChartPeriode);
  const[chartWilayah, setChartWilayah] = useState(data.Data.ChartWilayah);
  const[selectedTahun, setSelectedTahun] = useState(null)

  const datas = data.Data;
  const optionYears = datas.Tahuns.map((item) => ({
    value: item,
    label: item,
  }));

  const selectedYearOption = optionYears.find(
    (option) => option.value === datas.Tahun
  );

  // useEffect(() => {
  //   // Set the initial selected year option when data changes
  //   setSelectedTahun(selectedYearOption);
  // }, [datas.Tahun, optionYears]);

  const handleChangeTahun = async(selectedOption ) =>{
    const tahun = selectedOption  ? selectedOption .value : null;
    setSelectedTahun(selectedOption);

    if(tahun){
      const fetchOneSubData = await datasetService.getOneSubData(isKuisioner, datas.Kode, tahun);
      setChartPeriode(fetchOneSubData.Data.ChartPeriode);
      setChartWilayah(fetchOneSubData.Data.ChartWilayah);
    }
  }


  return (
    <Container>
      <div
        className="flex flex-col items-center justify-center"
        data-aos="fade-up"
      >
        <h2 className="font-bold text-center text-green-500 text-2xl">
          DESA CANTIK
        </h2>
        <h3 className="text-center text-white font-bold text-xl">
          Kab.
          <span className="font-normal text-yellow-200 uppercase">
            Musi Banyuasin
          </span>
        </h3>

        <h3 className="mt-2 text-center text-black font-bold">
          {" "}
          {datas.Judul} 
        </h3>
      </div>

      <div className="flex mb-20">
        <label className="text-white uppercase text-xl "> Tahun </label>
        <RSelect value={selectedTahun || selectedYearOption} options={optionYears}  styles={customStyles} className="ml-5" onChange={handleChangeTahun}  />
      </div>

      <div className="flex flex-wrap mx-4 lg:mx-6">
      <div className="w-full lg:w-1/2 px-2 lg:px-4 mb-4 lg:mb-0"> 
        <ContentChart data={chartPeriode} />
      </div>
      <div className="w-full lg:w-1/2 px-2 lg:px-4 mb-4 lg:mb-0">
      <ContentChart data={chartWilayah} />
      </div>
    </div>
    </Container>
  );
};
