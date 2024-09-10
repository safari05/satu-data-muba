import { Container } from "@/components/atoms";
import React from "react";

export const Breadcrumbs = ({ name }) => {
  return (
    <Container className="mb-10">
      <h1
        className="text-white font-bold text-2xl md:text-3xl uppercase"
        data-aos="fade-down"
      >
        {name}
      </h1>
    </Container>
  );
};
