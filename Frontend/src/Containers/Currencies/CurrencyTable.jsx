import React, { useState } from "react";
import CustomTable from "../../components/Tables/CustomTable";
import { useCurrencies } from "../../hooks/useCurrencies";

const CurrencyTable = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, isError, error } = useCurrencies({
    page: page + 1,
    limit,
  });
  const columns = [
    { id: "name", label: "Currency" },
    { id: "value", label: "Short Name" },
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <CustomTable
      columns={columns}
      data={data.data}
      limit={limit}
      page={page}
      total={data.totalRecords}
      loading={isLoading}
      onPageChange={setPage}
      onLimitChange={(newLimit) => {
        setLimit(newLimit);
        setPage(0);
      }}
    />
  );
};

export default CurrencyTable;
