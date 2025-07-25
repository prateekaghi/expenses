import PageHeader from "../../components/navigation/PageHeader";
import { useNavigate } from "react-router-dom";
import CurrencyTable from "../../Containers/Currencies/CurrencyTable";

const CurrencyList = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader backTo={"/dashboard"} title={"Currency list"} />
      <CurrencyTable />
    </>
  );
};

export default CurrencyList;
