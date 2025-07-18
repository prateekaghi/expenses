export const getCurrentMonthYear = () => {
  return new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};
