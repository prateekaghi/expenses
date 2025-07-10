export const generateDailyChartData = (dataArray, days = 30) => {
  const now = new Date();
  const dateMap = {};

  // Initialize with 0s for the past 30 days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const key = date.toISOString().split("T")[0]; // YYYY-MM-DD
    dateMap[key] = 0;
  }

  // Count users created on each day
  dataArray.forEach((item) => {
    const dateKey = new Date(item.date_created).toISOString().split("T")[0];
    if (dateKey in dateMap) {
      dateMap[dateKey]++;
    }
  });

  // Return array formatted for recharts
  return Object.entries(dateMap).map(([date, value]) => ({
    date,
    value,
  }));
};
