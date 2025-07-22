export const getCurrentMonthYear = () => {
  return new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // Jan
    day: "2-digit", // 19
    year: "numeric", // 2025
  });
};
