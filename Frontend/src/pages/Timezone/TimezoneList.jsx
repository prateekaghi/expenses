import PageHeader from "../../components/navigation/PageHeader";
import { useNavigate } from "react-router-dom";
import TimezoneTable from "../../Containers/Timezones/TimezoneTable";

const TimezoneList = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader backTo={"/dashboard"} title={"Timezone list"} />
      <TimezoneTable />
    </>
  );
};

export default TimezoneList;
