export function calculateMonthlyGrowth(dataArray) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  let thisMonthCount = 0;
  let lastMonthCount = 0;

  dataArray.forEach((item) => {
    const date = new Date(item.createdAt);
    const itemMonth = date.getMonth();
    const itemYear = date.getFullYear();

    if (itemMonth === currentMonth && itemYear === currentYear) {
      thisMonthCount++;
    } else if (itemMonth === lastMonth && itemYear === lastMonthYear) {
      lastMonthCount++;
    }
  });

  const growth =
    lastMonthCount === 0
      ? thisMonthCount === 0
        ? 0
        : 100
      : ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;

  return {
    thisMonth: thisMonthCount,
    lastMonth: lastMonthCount,
    growth: parseFloat(growth.toFixed(2)), // rounded to 2 decimals
  };
}
