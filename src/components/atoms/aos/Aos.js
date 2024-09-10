"use client";
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";

export const AnimateAos = () => {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return <div></div>;
};
