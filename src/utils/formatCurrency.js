export const formatCurrency = (value) => {
  if (!value) {
    return "0";
  }
  return Intl.NumberFormat("id-ID", {
    currency: "IDR",
  }).format(value);
};
