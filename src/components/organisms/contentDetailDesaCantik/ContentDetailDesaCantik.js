"use client";
import { Container, Select } from "@/components/atoms";
import RSelect from "react-select";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

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

const VulnChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            "Sqli",
            "XSS",
            "XXE",
            "Open Redirect",
            "Broken Authentication"
          ],
          datasets: [
            {
              label: "# of vulnerabilities",
              data: [15, 12, 6, 7, 4],
              backgroundColor: ["red", "yellow", "blue", "black", "green"]
            },
          ]
        }}
        height={300}
        width={500}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export const ContentDetailDesaCantik = ({ data }) => {
 
  const Datas = data.Data;
  const optionYears = Datas.Years.map((item, index) => ({
    value: item.Id,
    label: item.Label,
  }));

  const selectedYearOption = optionYears.find(
    (option) => option.value === Datas.Year
  );
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
          {Datas.Title}
        </h3>
      </div>

      <div className="flex mb-20">
        <label className="text-white uppercase text-xl "> Tahun </label>
        <RSelect value={selectedYearOption} options={optionYears}  styles={customStyles} className="ml-5"   />
      </div>

      <div className="flex flex-wrap mx-4 lg:mx-6">
      <div className="w-full lg:w-1/2 px-2 lg:px-4 mb-4 lg:mb-0">
        <VulnChart />
      </div>
      <div className="w-full lg:w-1/2 px-2 lg:px-4 mb-4 lg:mb-0">
        <VulnChart />
      </div>
    </div>
    </Container>
  );
};
