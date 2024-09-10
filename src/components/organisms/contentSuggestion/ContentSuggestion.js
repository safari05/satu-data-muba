"use client";
import { Button, Container, Select, TextInput } from "@/components/atoms";
import { GlobalContext, setFormGlobal } from "@/context";
import {
  useComboDatasetCategoryQuery,
  useComboSuggestionCategoryQuery,
  useSaveSuggestion,
} from "@/hooks";
import { useContext } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useAlert } from "react-alert";

export const ContentSuggestion = () => {
  const alert = useAlert();
  const { dispatch, state } = useContext(GlobalContext);
  const suggestionCategoryQuery = useComboSuggestionCategoryQuery();
  const datasetCategoryQuery = useComboDatasetCategoryQuery();

  const btnSave = () => useSaveSuggestion(state.formGlobal, alert);
  return (
    <Container>
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <div className="md:w-4/12 w-full">
          <h1
            className="text-white text-2xl font-bold mb-3"
            data-aos="fade-left"
          >
            Deskripsi Saran Dataset
          </h1>
          <p className="text-white text-base" data-aos="fade-right">
            Anda dapat mengajukan Data yang dibutuhkan di halaman ini tentang
            Seluruh Unit Kerja Pemerintah Kabupaten Musi Banyuasin. <br />
            <br /> Jika Anda memiliki saran data yang dibutuhkan masyarakat
            tentang Seluruh Unit Kerja Pemerintah Kabupaten Musi Banyuasin,
            silahkan isi kolom ini
          </p>
        </div>
        <div className="md:w-8/12 w-full">
          <div className="bg-[#043C40] border-solid border-2 border-[#138489] p-6 rounded-md mb-4">
            <h6 className="text-[#22D4EC] text-base font-medium mb-1">
              Saran Dataset
            </h6>
            <h1 className="text-white text-4xl font-bold mb-5">Formulir</h1>
            <div>
              <form>
                <div className="grid grid-cols-2 gap-6">
                  <TextInput
                    label="Nama Lengkap*"
                    placeholder="Masukkan Nama Lengkap..."
                    onChange={(e) =>
                      dispatch(setFormGlobal("name", e.target.value))
                    }
                  />
                  <TextInput
                    label="Email*"
                    placeholder="Masukkan Email..."
                    onChange={(e) =>
                      dispatch(setFormGlobal("email", e.target.value))
                    }
                  />
                  <div className="col-span-2">
                    <TextInput
                      type="number"
                      label="No Telepon*"
                      placeholder="Masukkan No Telepon yang bisa dihubungi..."
                      onChange={(e) =>
                        dispatch(setFormGlobal("mobile", e.target.value))
                      }
                    />
                  </div>
                  <Select
                    options={suggestionCategoryQuery.data}
                    label="Kategori Pemohon*"
                    onChange={(e) =>
                      dispatch(setFormGlobal("userSuggestionCategoryId", e))
                    }
                  />
                  <Select
                    options={datasetCategoryQuery.data}
                    label="Topik Dataset*"
                    onChange={(e) =>
                      dispatch(setFormGlobal("datasetCategoryId", e))
                    }
                  />
                  <div className="col-span-2">
                    <TextInput
                      label="Saran*"
                      placeholder="Tolong jelaskan mengenai dataset yang anda sarankan..."
                      onChange={(e) =>
                        dispatch(
                          setFormGlobal("datasetSuggestion", e.target.value)
                        )
                      }
                      isTextArea
                    />
                  </div>
                  <div className="col-span-2">
                    <TextInput
                      label="Alasan*"
                      placeholder="Masukkan Alasan mengapa dataset itu penting..."
                      onChange={(e) =>
                        dispatch(setFormGlobal("datasetReason", e.target.value))
                      }
                      isTextArea
                    />
                  </div>
                  <div className="col-span-2 mt-5">
                    <Button
                      bgColor={"bg-[#00829E] w-full"}
                      icon={<FaPaperPlane size={15} color="white" />}
                      name="Kirim Pesan"
                      onClick={() => btnSave()}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
