import { SuggestionCriticsmScreen } from "@/components/screens";
import React from "react";

export default function KritikSaran() {
  return <SuggestionCriticsmScreen />;
}

export async function generateMetadata() {
  return {
    title:
      "Form Kritik & Saran Dataset | Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description:
      "Anda dapat mengajukan Data yang dibutuhkan di halaman ini tentang Seluruh Unit Kerja Pemerintah Kabupaten Musi Banyuasin.   Jika Anda memiliki saran data yang dibutuhkan masyarakat tentang Seluruh Unit Kerja Pemerintah Kabupaten Musi Banyuasin, silahkan isi kolom ini",
  };
}
