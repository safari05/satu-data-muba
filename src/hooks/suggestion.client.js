import { DatasetService } from "@/services";

export const useSaveSuggestion = (data, alert) => {
  if (!data.name) {
    alert.info("Nama wajib diisi!");
    return;
  }
  if (!data.email) {
    alert.info("Email wajib diisi!");
    return;
  }
  if (!data.mobile) {
    alert.info("Nomor HP wajib diisi!");
    return;
  }
  if (!data.userSuggestionCategoryId) {
    alert.info("Kategori pemohon wajib diisi!");
    return;
  }
  if (!data.datasetCategoryId) {
    alert.info("Dataset yang disarankan wajib diisi!");
    return;
  }
  if (!data.datasetSuggestion) {
    alert.info("Saran dataset wajib diisi!");
    return;
  }
  if (!data.datasetReason) {
    alert.info("Alasan wajib diisi!");
    return;
  }
  var fd = new FormData();
  fd.append("Name", data.name);
  fd.append("Email", data.email);
  fd.append("Mobile", data.mobile);
  fd.append("UserSuggestionCategoryId", data.userSuggestionCategoryId?.value);
  fd.append("DatasetCategoryId", data.datasetCategoryId?.value);
  fd.append("DatasetSuggestion", data.datasetSuggestion);
  fd.append("DatasetReason", data.datasetReason);
  DatasetService.saveUserSuggestion(fd)
    .then((res) => {
      alert.success("Pesan anda berhasil dikirim!", {
        timeout: 2000,
        onClose: () => window.location.reload(),
      });
    })
    .catch((err) => {
      alert.error(`Something went wrong`);
    });
};
