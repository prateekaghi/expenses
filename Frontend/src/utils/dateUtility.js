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

export const isoToDateInputFormat = (isoString) => {
  if (!isoString) return "";
  try {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // returns "YYYY-MM-DD"
  } catch (e) {
    return "";
  }
};
