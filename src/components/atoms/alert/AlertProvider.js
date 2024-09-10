"use client";
import {
  transitions,
  positions,
  Provider as AlertProviderx,
} from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

export const AlertProvider = ({ children }) => {
  return (
    <AlertProviderx template={AlertTemplate} {...options}>
      {children}
    </AlertProviderx>
  );
};
