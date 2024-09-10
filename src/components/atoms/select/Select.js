"use client";
import { FUNCToSnakeCase } from "@/utils/func";
import React from "react";
import RSelect from "react-select";

export const Select = ({
  defaultValue,
  value,
  options,
  label,
  placeholder = "Pilih Salah Satu",
  onChange,
}) => {
  return (
    <div>
      {label && <p className="text-white mb-2">{label}</p>}
      <RSelect
        options={options}
        className="text-sm w-full"
        id={FUNCToSnakeCase(label)}
        instanceId={FUNCToSnakeCase(label)}
        menuPortalTarget={typeof window !== "undefined" && document.body}
        menuPosition={"fixed"}
        styles={{
          menu: (provided) => ({ ...provided, zIndex: 9999 }),
          option: (provided) => ({
            ...provided,
            color: "#000",
            fontSize: 13,
          }),
          control: (provided) => ({
            ...provided,
            color: "#fff",
            boxShadow: "none",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "black",
          }),
        }}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
