import { Container, SearchBar } from "@/components/atoms";
import React from "react";

export const SearchOrganization = () => {
  return (
    <Container className="mb-5">
      <h3 className="text-white font-bold text-xl mb-3" data-aos="fade-right">
        Telusuri Berdasarkan{" "}
        <span className="font-normal underline text-white">Organisasi</span>
      </h3>
      <div data-aos="fade-left">
        <SearchBar />
      </div>
    </Container>
  );
};
