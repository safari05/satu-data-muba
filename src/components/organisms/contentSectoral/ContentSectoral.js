import { DataTable, WidgetCountSectoral } from "@/components/molecules";
import React from "react";
import { FormSearchSectoral } from "../formSearchSectoral";
import { Container } from "@/components/atoms";

export const ContentSectoral = (data) => {
  return (
    <Container>
      <FormSearchSectoral />
      {/* WIDGET */}
      <WidgetCountSectoral />

      <div
        className="bg-[#043C40] border-solid border-2 border-[#138489] p-6 rounded-md mb-4"
        data-aos="fade-up"
      >
        <div data-aos="fade-in">
          <DataTable
            data={data.data.data?.data}
            column={data.data.data?.columns}
          />
        </div>
      </div>
    </Container>
  );
};
