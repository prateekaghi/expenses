import React, { useState } from "react";
import { useGetUserCategories } from "../../hooks/useCategories";
import { useUserExpenses } from "../../hooks/useExpenses";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const CategoryPieChart = () => {
  let data = [];
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const { data: userCategories, isLoading: categoriesLoading } =
    useGetUserCategories({
      page: page + 1,
      limit,
    });

  const {
    data: userExpenses,
    isLoading,
    isError,
    error,
    isFetching,
  } = useUserExpenses({
    page: page + 1,
    limit: limit,
  });
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8854d0",
    "#20bf6b",
  ];

  const getChartData = () => {
    const categoryMap = {};
    userCategories.data.forEach((cat) => {
      categoryMap[cat.id] = cat.name;
    });

    const categoryCounts = {};
    userExpenses.data.forEach((exp) => {
      const catId = exp.category;
      categoryCounts[catId] = (categoryCounts[catId] || 0) + 1;
    });

    const totalCount = userExpenses.data.length;

    return Object.entries(categoryCounts).map(([catId, count]) => ({
      name: categoryMap[catId] || "Unknown",
      value: parseFloat(((count / totalCount) * 100).toFixed(2)),
      count,
    }));
  };

  if (userExpenses && userCategories) {
    data = getChartData();
    console.log("dataaaa", data);
  }

  return (
    <div>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#0e096dff"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CategoryPieChart;
