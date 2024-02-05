import React, { useEffect } from "react";
import { getAllLogs } from "../../Store/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../Store/App/hooks";
import { List } from "antd";
import {
  filterType,
  selectFilteredLogs,
  selectLogs,
  setFilter,
} from "../../Store/Logs/logsSlice";
import LogItem from "../../Components/Logs/LogItem";
import { useSearchParams } from "react-router-dom";

const LogsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllLogs());
  }, []);
  useEffect(() => {
    if (filter !== null) {
      dispatch(setFilter(filter.toUpperCase() as filterType));
    }
  }, [filter]);

  const logs = useAppSelector(selectFilteredLogs);
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={logs}
        renderItem={(item, index) => <LogItem log={item} />}
      />
    </div>
  );
};

export default LogsPage;
