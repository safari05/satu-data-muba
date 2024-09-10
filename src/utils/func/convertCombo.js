export const FUNCArraySelectId = (data) => {
  var array = [];
  data.map((v, i) => {
    array.push({
      value: v.Id,
      label: v.Name,
    });
  });
  return array;
};

export const FUNCArraySelectCode = (data, isAll = false) => {
  var array = [];
  if (isAll)
    array.push({
      value: "",
      label: "Pilih Semua",
    });
  data.map((v, i) => {
    array.push({
      value: v.Code,
      label: v.Name,
    });
  });
  return array;
};
